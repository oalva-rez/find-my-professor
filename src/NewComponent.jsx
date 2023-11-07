import { useEffect, useState } from "react";
function NewComponent() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const data = await fetch("./spring-courses.json");
            const json = await data.json();
            setCourses(json);
            setLoading(false);
        })();
    }, []);
    console.log(courses);
    return <div>{loading ? <h1>Loading...</h1> : <h1>Data Recieved</h1>}</div>;
}

export default NewComponent;
