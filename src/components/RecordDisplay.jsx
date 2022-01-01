import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState('');
    const filteredArray = students.filter(
        (record) =>
            record.firstName.toLowerCase().includes(input.toLowerCase()) ||
            record.lastName.toLowerCase().includes(input.toLowerCase())
    );
    const [hasError, setHasError] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const handleClick = (e) => {
        setCollapsed(!collapsed);
        //console.log(collapsed);
    };

    const handleChange = (e) => {
        const change = e.target.value;

        setInput(change);
    };

    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            try {
                const response = await fetch(
                    'https://api.hatchways.io/assessment/students'
                );
                const data = await response.json();
                // store the data into our students variable
                setStudents(data.students);
            } catch (e) {
                setHasError(true);
            }
        }
    }, []); // <- you may need to put the setRecords function in this array

    return (
        <>
            <input
                className='search-bar'
                type='text'
                id='name-search'
                placeholder='Search by name'
                onChange={handleChange}
            />
            <hr />
            {hasError && <h3>Unable to retrieve data!</h3>}
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
                                <div>
                                    {collapsed ? (
                                        <FaPlus
                                            className='dropdown'
                                            onClick={handleClick}
                                        />
                                    ) : (
                                        <FaMinus
                                            className='dropdown'
                                            onClick={handleClick}
                                        />
                                    )}
                                    <h2 className='name'>
                                        {student.firstName} {student.lastName}
                                    </h2>
                                </div>
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
        </>
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

/* {!collapsed &&
    student.grades.map((grade) => (
        <p>{grade}</p>
    ))}
 */
