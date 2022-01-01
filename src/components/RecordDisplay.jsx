import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState('');
    const filteredAddProp = students.map((student) => ({
        ...student,
        isOpen: false,
    }));
    const filteredArray = filteredAddProp.filter(
        (record) =>
            record.firstName.toLowerCase().includes(input.toLowerCase()) ||
            record.lastName.toLowerCase().includes(input.toLowerCase())
    );

    const [hasError, setHasError] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    // event handler for clicking on collapse/expand icon
    const handleClick = (id) => {
        const singleRecord = filteredArray.find((record) => record.id === id);
        console.log(singleRecord);

        singleRecord.isOpen = !singleRecord.isOpen;

        console.log(singleRecord.isOpen);
        return singleRecord;
    };

    // event handler for search bar input
    const handleInput = (e) => {
        const input = e.target.value;
        setInput(input);
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
            <div>
                <input
                    className='search-bar'
                    type='text'
                    id='name-search'
                    placeholder='Search by name'
                    onChange={handleInput}
                />
                <hr />
            </div>
            {hasError && <h3>Unable to retrieve data!</h3>}
            {/* display records from the API */}
            {students && (
                <div>
                    {/* loop over the records */}
                    {filteredArray.map((student, index) => (
                        <div key={index} className='image-txt-container'>
                            <img
                                className='image-round'
                                src={student.pic}
                                alt='icon'
                            />
                            <div>
                                <div>
                                    {console.log(student.isOpen)}
                                    {student.isOpen ? (
                                        <FaMinus
                                            className='collapseExpand'
                                            onClick={() =>
                                                handleClick(student.id)
                                            }
                                        />
                                    ) : (
                                        <FaPlus
                                            className='collapseExpand'
                                            onClick={() =>
                                                handleClick(student.id)
                                            }
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
                                    {student.isOpen && (
                                        <div>
                                            {student.grades.map(
                                                (grade, index) => (
                                                    <p key={index}>
                                                        Test {index + 1}:{' '}
                                                        {grade}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    )}
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

const changeCollapse = (student) => {
    //student.isOpen = !student.isOpen;
    console.log(student.isOpen);
};

export default RecordDisplay;

/* {!collapsed &&
    student.grades.map((grade) => (
        <p>{grade}</p>
    ))}
 */
