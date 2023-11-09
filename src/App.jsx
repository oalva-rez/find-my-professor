import Select, { createFilter } from "react-select";
import { useState, useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";
import ProfCard from "./ProfCard";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [courseData, setCourseData] = useState([]);
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [groupedOptions, setGroupedOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef(null);
    const resultsRef = useRef(null);
    // Handle input change
    const handleInputChange = (newValue) => {
        console.log("handleInputChange", newValue);
        setInputValue(newValue);
    };
    const groupByCategory = (data) => {
        // Helper function to add unique items to the group
        const addUniqueItem = (group, item) => {
            const isExisting = group.some(
                (groupItem) => groupItem.value === item.value
            );
            if (!isExisting) {
                group.push(item);
            }
        };

        // Object to hold the grouped data
        const groupedData = {
            professorName: [],
            professorEmail: [],
            courseId: [],
            courseName: [],
            classNumber: [],
        };
        const formatName = (name) => {
            const splitName = name.split(",");
            if (splitName.length < 2) {
                return name;
            }
            const newName = splitName.join(", ");
            return newName;
        };
        const formatCourseID = (courseID) => {
            const splitCourseID = courseID.split(" ");
            return splitCourseID.join("");
        };
        // Iterate over each item in the array
        data.forEach((item) => {
            const { NAME, EMAIL_ADDR, CRSE, CRSE_NAME, CLASS_NBR } = item;

            addUniqueItem(groupedData.professorName, {
                label: formatName(NAME),
                value: NAME,
            });
            addUniqueItem(groupedData.professorEmail, {
                label: EMAIL_ADDR,
                value: EMAIL_ADDR,
            });
            addUniqueItem(groupedData.courseId, {
                label: formatCourseID(CRSE),
                value: CRSE,
            });
            addUniqueItem(groupedData.courseName, {
                label: CRSE_NAME,
                value: CRSE_NAME,
            });
            addUniqueItem(groupedData.classNumber, {
                label: `${CLASS_NBR}`,
                value: CLASS_NBR,
            });
        });

        // Transform the grouped data into an array suitable for react-select
        const groupedOptions = Object.keys(groupedData).map((key) => ({
            label:
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1"), // Convert camelCase to Title Case
            options: groupedData[key],
        }));

        return groupedOptions;
    };
    const handleSearch = (value) => {
        console.log("handleSearch", value);
        const filteredData = courseData.filter((item) => {
            const { NAME, EMAIL_ADDR, CRSE, CRSE_NAME, CLASS_NBR } = item;
            const searchTerm = value.toString().toLowerCase();
            const name = NAME.toLowerCase() === "" ? "TBD" : NAME.toLowerCase();
            const email = EMAIL_ADDR.toLowerCase();
            const courseID = CRSE.toLowerCase();
            const courseName = CRSE_NAME.toLowerCase();
            const classNumber = CLASS_NBR.toString().toLowerCase();
            if (
                name.includes(searchTerm) ||
                email.includes(searchTerm) ||
                courseID.includes(searchTerm) ||
                courseName.includes(searchTerm) ||
                classNumber.includes(searchTerm)
            ) {
                return true;
            }
            return false;
        });
        console.log(filteredData);
        const formattedData = {};
        filteredData.forEach((item) => {
            // This is the key for the professor
            const professorKey = item.NAME === "" ? "TBD" : item.NAME;

            // Create a unique key for the course using the course ID
            const courseKey =
                `${item.SUBJECT.trim()}${item.CATALOG_NBR.trim()}`.trim();

            // If the professor doesn't exist in the formattedData, add them
            if (!formattedData[professorKey]) {
                formattedData[professorKey] = {
                    professorName: professorKey,
                    professorEmail: item.EMAIL_ADDR,
                    courses: {},
                };
            }

            // If the course doesn't exist under the professor, add it
            if (!formattedData[professorKey].courses[courseKey]) {
                formattedData[professorKey].courses[courseKey] = {
                    courseName: item.CRSE_NAME,
                    courseId:
                        `${item.SUBJECT.trim()}${item.CATALOG_NBR.trim()}`.trim(),
                    sections: [],
                };
            }

            // Add the section to the course
            formattedData[professorKey].courses[courseKey].sections.push({
                sectionId: item.CLASS_NBR,
                startTime: item.STARTTIME,
                endTime: item.ENDTIME,
                days: item.DAYS,
                seats: item.SEATS,
                courseType: item.CRSE_TYPE,
                startDate: item.START_DATE,
                endDate: item.END_DATE,
            });
        });
        const professorsArray = Object.values(formattedData).map((prof) => ({
            ...prof,
            courses: Object.values(prof.courses),
        }));
        console.log(professorsArray);
        setFilteredOptions(professorsArray);
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("./spring-courses.json");
                const data = await res.json();

                const transformedData = groupByCategory(data);
                setGroupedOptions(transformedData);
                setCourseData(data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        })();
    }, []);
    useEffect(() => {
        console.log(resultsRef.current, filteredOptions);
        if (resultsRef.current && filteredOptions.length > 0) {
            console.log("scrolling into view");
            // Scrolls the `resultsRef` element into view
            resultsRef.current.scrollIntoView({
                behavior: "smooth", // Defines the transition animation
                block: "nearest", // Vertical alignment
                inline: "start", // Horizontal alignment
            });
        }
    }, [filteredOptions]);
    return (
        <>
            {isLoading ? (
                <div className="loading">
                    <PulseLoader color="#06315C" size={25} />
                    <h1>Loading content...</h1>
                </div>
            ) : (
                <>
                    <div id="main-content">
                        <div
                            className={
                                filteredOptions.length > 0
                                    ? "header showing-results"
                                    : "header"
                            }
                        >
                            <h1 className="heading">Find My Professor</h1>
                            <h2 className="subheading">
                                Search professor by{" "}
                                <span className="bold">name</span>,{" "}
                                <span className="bold">email</span>,{" "}
                                <span className="bold">course ID</span>,{" "}
                                <span className="bold">Course Title</span> or{" "}
                                <span className="bold">Section number</span>.
                            </h2>
                            <div className="search-input-container">
                                <Select
                                    options={groupedOptions}
                                    onChange={(e) => {
                                        if (e === null) {
                                            return;
                                        }
                                        console.log(e);
                                        handleSearch(e.value);
                                    }}
                                    onInputChange={handleInputChange}
                                    menuIsOpen={inputValue.length > 0}
                                    inputValue={inputValue}
                                    className="select-input"
                                    placeholder="Search here..."
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    }}
                                    isClearable={true}
                                    blurInputOnSelect={true}
                                    filterOption={createFilter({
                                        ignoreAccents: false,
                                    })}
                                    required={true}
                                />
                            </div>
                        </div>
                    </div>

                    {filteredOptions.length > 0 && (
                        <div className="course-results" ref={resultsRef}>
                            {filteredOptions.map((prof) => {
                                return (
                                    <ProfCard
                                        key={prof.professorName}
                                        data={prof}
                                    />
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default App;
