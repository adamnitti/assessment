import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState('');
    const [hasError, setHasError] = useState(false);

    const filteredStudents = students.filter((record) => {
        return (
            record.firstName.toLowerCase().includes(input.toLowerCase()) ||
            record.lastName.toLowerCase().includes(input.toLowerCase())
        );
    });

    // + adding the use
    useEffect(() => {
        // we will use async/await to fetch this data
        async function getData() {
            try {
                const response = await fetch(
                    'https://api.hatchways.io/assessment/students'
                );
                const data = await response.json();

                // Augment the API data for the needs of the UI
                // Add an iOpen prop to each student object.
                const studentsWithIsOpenFlag = data.students.map((student) => ({
                    ...student,
                    isOpen: false,
                }));

                // store the data into our students variable
                setStudents(studentsWithIsOpenFlag);
                //setStudentList(data.students);
            } catch (e) {
                setHasError(true);
            }
        }

        getData();
    }, []); // <- you may need to put the setRecords function in this array

    // event handler for clicking on collapse/expand icon
    const handleClick = (id) => {
        const newStudents = students.map((item) => {
            if (item.id === id) {
                const updatedRecord = () => {
                    item.isOpen = !item.isOpen;
                };
                updatedRecord(item);
            }

            return item;
        });

        setStudents(newStudents);
    };

    // event handler for search bar input
    const handleInput = (e) => {
        const input = e.target.value;
        setInput(input);
    };

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

            <div>
                {/* loop over the records */}
                {filteredStudents.map((student, index) => (
                    <div key={index} className='image-txt-container'>
                        <img
                            className='image-round'
                            src={student.pic}
                            alt='icon'
                        />
                        <div>
                            <div>
                                <button
                                    className='collapseExpandMinus'
                                    onClick={() => handleClick(student.id)}
                                >
                                    {student.isOpen ? 'close' : 'open'}
                                </button>

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
                                        {student.grades.map((grade, index) => (
                                            <p key={index}>
                                                Test {index + 1}: {grade}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
