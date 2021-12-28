import { useState } from 'react';

function Search() {
    const [input, setInput] = useState('');
    const handleChange = (e) => {
        const change = e.target.value;
        setInput(change);
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
