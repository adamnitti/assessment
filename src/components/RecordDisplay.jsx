import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [records, setRecords] = useState();
    const [input, setInput] = useState('');
    const filteredArray = [];

    const handleChange = (e) => {
        const change = e.target.value;

        setInput(change);
        filter();
    };

    const filter = () => {
        console.log(filteredArray);
        console.log('records=', records);
        console.log('filteredArray=', filteredArray);
        const filtered = records.students.filter(
            (record) =>
                record.firstName.toLowerCase().includes(input.toLowerCase()) ||
                record.lastName.toLowerCase().includes(input.toLowerCase())
        );
        console.log(filtered);
        filteredArray.push(filtered);

        return filteredArray;
    };

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

export default RecordDisplay;
