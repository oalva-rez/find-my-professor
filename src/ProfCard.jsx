import React from "react";

function ProfCard({ data }) {
    const { professorName, professorEmail, courses } = data;
    return (
        <div className="prof-card">
            <div className="custom-legend">
                <div className="prof-name">{professorName} </div>
                {professorEmail ? (
                    <a href={`mailto:${professorEmail}`}> - {professorEmail}</a>
                ) : null}
            </div>
            <div className="courses-container">
                {courses.map((course, index) => (
                    <div className="course" key={index}>
                        <div className="course-header">
                            {course.courseId} - {course.courseName}
                        </div>
                        <table className="sections">
                            <thead>
                                <tr>
                                    <th>Section Number</th>
                                    <th>Seats Available</th>
                                    <th>Days & Times</th>
                                    <th>Meeting Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {course.sections.map((section, index) => (
                                    <tr key={index}>
                                        <td>{section.sectionId}</td>
                                        <td>{section.seats}</td>
                                        <td>
                                            {section.startTime &&
                                            section.endTime
                                                ? section.startTime +
                                                  " - " +
                                                  section.endTime
                                                : null}
                                        </td>
                                        <td>
                                            {section.startDate &&
                                            section.endDate
                                                ? section.startDate +
                                                  " - " +
                                                  section.endDate
                                                : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfCard;
