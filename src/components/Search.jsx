function Search() {
    const handleChange = () => {
        console.log('changing...');
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
            <hr />
        </>
    );
}

export default Search;
