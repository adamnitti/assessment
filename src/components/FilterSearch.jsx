import { useState } from 'react';
import Search from './Search';

function FilterSearch({ records }) {
    const [filtered, setFiltered] = useState(records);
    console.log(filtered);

    return <div>{console.log('in FilterSearch component')}</div>;
}

export default FilterSearch;
