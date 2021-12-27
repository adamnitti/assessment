import { useState, useEffect } from 'react';

function App() {
    const [records, setRecords] = useState(null);
    const average = (grades, length) => {
        console.log(grades);
        var sum = 0;
        grades.map((grade) => {
            sum = sum + Number(grade);
            console.log(sum);
        });
        var average = sum / length;
        return average;
    };

    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const response = await fetch(
                'https://api.hatchways.io/assessment/students'
            );
            const data = await response.json();

            // store the data into our records variable
            setRecords(data);
            console.log(data);
        }
    }, []); // <- you may need to put the setRecords function in this array

    return (
        <div>
            {/* display records from the API */}
            {records && (
                <div>
                    {/* loop over the records */}
                    {records.students.map((student, id) => (
                        <div key={id} className='image-txt-container'>
                            <img
                                className='image-round'
                                src={student.pic}
                                alt='icon'
                            />
                            <div>
                                <h2 className='name'>
                                    {student.firstName} {student.lastName}
                                </h2>
                                <div className='details'>
                                    <p>Email: {student.email}</p>
                                    <p>Company: {student.company}</p>
                                    <p>Skill: {student.skill}</p>
                                    <p>
                                        Average:{' '}
                                        {average(
                                            student.grades,
                                            student.grades.length
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
