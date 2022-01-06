import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function RecordDisplay() {
    const [students, setStudents] = useState([]);
    const [nameSearchInput, setNameSearchInput] = useState('');
    const [tagSearchInput, setTagSearchInput] = useState('');
    const [hasError, setHasError] = useState(false);

    const filteredStudents = students.filter((record) => {
        return (
            record.firstName
                .toLowerCase()
                .includes(nameSearchInput.toLowerCase()) ||
            record.lastName
                .toLowerCase()
                .includes(nameSearchInput.toLowerCase())
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
    }, []);

    // event handler for search bar input
    const handleNameSearchInput = (e) => {
        const input = e.target.value;
        setNameSearchInput(input);
    };

    // event handler for tag search bar input
    const handleTagSearchInput = (e) => {
        const input = e.target.value;
        setTagSearchInput(input);
    };

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

    // event handler for create tag input
    const handleTagInput = (e, studentId) => {
        const tagInput = e.target.value;
        if (e.key !== 'Enter' || !tagInput) return;

        const newStudentList = students.map((student) => {
            if (student.id === studentId) {
                if (
                    student.tags.find(
                        (tag) => tagInput.toLowerCase() === tag.toLowerCase()
                    )
                ) {
                    console.log('duplicate tag', tagInput);
                    alert('Duplicate tag name!');

                    return student;
                }
                return { ...student, tags: [...student.tags, tagInput] };
            }
            return student;
        });
        console.log(newStudentList);
        setStudents(newStudentList);
        e.currentTarget.value = '';
    };

    return (
        <>
            <input
                className='search-bar'
                type='text'
                id='name-search'
                placeholder='Search by name'
                onChange={handleNameSearchInput}
            />
            <hr />
            <input
                className='search-bar'
                type='text'
                id='tag-search'
                placeholder='Search by tag'
                onChange={handleTagSearchInput}
            />
            <hr />

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
                                {student.isOpen && (
                                    <div className='gradesList-div'>
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
                                {student.tags && (
                                    <div className='tagContainer'>
                                        {student.tags.map((tag, index) => (
                                            <span className='tag' key={index}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <input
                                    type='text'
                                    className='search-bar-tag'
                                    placeholder='Add a tag'
                                    onKeyDown={(e) =>
                                        handleTagInput(e, student.id)
                                    }
                                />
                                <hr />
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
