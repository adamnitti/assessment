import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState('');
    const filteredArray = students.filter(
        (record) =>
            record.firstName.toLowerCase().includes(input.toLowerCase()) ||
            record.lastName.toLowerCase().includes(input.toLowerCase())
    );

    const handleChange = (e) => {
        const change = e.target.value;

        setInput(change);
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
            /* setRecords(data); */
            setStudents(data.students);
        }
    }, []); // <- you may need to put the setRecords function in this array

    return (
        <div>
            <input
                className='search-bar'
                type='text'
                id='name-search'
                placeholder='Search by name'
                onChange={handleChange}
            />
            <hr />
            {/* display records from the API */}
            {students && (
                <div>
                    {/* loop over the records */}
                    {filteredArray.map((student, id) => (
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

// + calculates grade average for student
const average = (grades, length) => {
    var sum = 0;
    grades.map((grade) => {
        sum = sum + Number(grade);
        return sum;
    });
    var average = sum / length;
    return average;
};

export default RecordDisplay;
