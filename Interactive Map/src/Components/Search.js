import { useRef, useState } from 'react';
import SearchResults from './SearchResults';

export default function Search() {
    const searchBtnRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [results, setResults] = useState([]);
    const [allResults, setAllResults] = useState([]);

    

    const searchClick = async () => {
        const searchParam = document.getElementById('search').value;

        // url to search the location on openstreet map as per entered value in search box
        const url = `https://nominatim.openstreetmap.org/search?q=${searchParam}&format=json`;

        // fetch results for the searched location
        const response = await fetch(url);
        const data = await response.json();  

        setResults(data);
        setAllResults(data);

        // open the results
        setIsOpen(true); 

        if (data.length > 0){
            const filterOptionsSet = new Set();

            // added the categories to set to avoid duplicates
            data.forEach((record) => {
                filterOptionsSet.add(record.type);
            });   

            setFilters(Array.from(filterOptionsSet));
        }
        else{
            setFilters([]);
            setSelectedFilter([]);
            setResults([]);
            setAllResults([]);
        }
    }

    return (
        <div>
            <div className="search-container">
                <input type="text" id="search" placeholder="Enter location" />
                <button ref={searchBtnRef} 
                className="search-btn" 
                id="searchBtn"
                onClick={searchClick}>
                    Search<i className="bi bi-search"></i>
                </button>
            </div>
            <SearchResults filters={filters} 
                selectedFilter={selectedFilter} 
                setSelectedFilter={setSelectedFilter} 
                allResults={allResults}
                setAllResults={setAllResults} 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                results={results}
                setResults={setResults}
            />
        </div>
    ) 
}