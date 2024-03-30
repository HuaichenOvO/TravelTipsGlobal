import { useState } from 'react';

export default function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery("");
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    );
}
