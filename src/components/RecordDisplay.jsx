import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
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
                    tags: [],
                }));

                // store the data into our students variable
                setStudents(studentsWithIsOpenFlag);
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

    // event handler for search tag input
    const handleTagInput = (e, id) => {
        console.log(id);
        const tagInput = e.target.value;
        if (e.key === 'Enter') {
            if (
                tags.find((tag) => tagInput.toLowerCase() === tag.toLowerCase())
            ) {
                console.log('tagInput', tagInput);
                return;
            }
            setTags([...tags, tagInput]);
        }
    };

    return (
        <>
            <input
                className='search-bar'
                type='text'
                id='name-search'
                placeholder='Search by name'
                onChange={handleInput}
            />
            <hr />

            {hasError && <h3>Unable to retrieve data!</h3>}
            {/* display records from the API */}

            <div>
                {console.log(students)}
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
                                {student.isOpen ? (
                                    <FaMinus
                                        className='collapseExpand'
                                        onClick={() => handleClick(student.id)}
                                    />
                                ) : (
                                    <FaPlus
                                        className='collapseExpand'
                                        onClick={() => handleClick(student.id)}
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
                                <div className='tagContainer'>
                                    {tags.map((tag, index) => (
                                        <div key={index}>{tag}</div>
                                    ))}
                                </div>
                                <input
                                    type='text'
                                    className='search-bar-tag'
                                    placeholder='Add a tag'
                                    onKeyDown={(e) =>
                                        handleTagInput(e, student.id)
                                    }
                                />
                                <hr />
                                {student.isOpen && (
                                    <div>
                                        {student.grades.map((grade, index) => (
                                            <p
                                                className='gradesList'
                                                key={index}
                                            >
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
