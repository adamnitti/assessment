import { useState } from 'react';

function Search({ records }) {
    const [input, setInput] = useState('');
    const filteredArray = [];

    const handleChange = (e) => {
        const change = e.target.value;

        setInput(change);
        filter(input);
    };

    const filter = () => {
        const length = records.students.length;
        console.log(length);
        console.log(filteredArray);
        for (let i = 0; i < length; i++) {
            //console.log(records.students[i].firstName);
            if (
                records.students[i].firstName
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                records.students[i].lastName
                    .toLowerCase()
                    .includes(input.toLowerCase())
            ) {
                console.log(
                    records.students[i].firstName,
                    records.students[i].lastName
                );
            }
        }
    };

    return (
        <>
            <input
                className='search-bar'
                type='text'
                id='name-search'
                placeholder='Search by name'
                onChange={handleChange}
            />
            <p>{input}</p>
            <hr />
        </>
    );
}

export default Search;
