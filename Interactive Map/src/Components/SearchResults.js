import { useRef, useEffect } from 'react';
import { L, map } from './LeafletMap';
import Icons from '../data/Icons';

export default function SearchResults(props) {
    const previousLoc = useRef(null);
    const resultsRef = useRef(null);
    const {filters, selectedFilter, setSelectedFilter, results, setResults, allResults, isOpen, setIsOpen} = props;

    const filterClick = (filter) => {
        
        // dynamically create element to display the fetched results as per the selected cateory
        setSelectedFilter(filter);

        // filter the results using allResults and then set results
        const filtered = allResults.filter(result => result.type === filter); 
        setResults(filtered);
    }

    const resultClick = (result) => {
        // set the view/area for the location
        map.setView([result.lat, result.lon], 13);

        // remove the previous marker
        if (previousLoc.current){
            map.removeLayer(previousLoc.current);
        }

        // functionality to display icon as per the type/class of location
        const key = `${result.class}:${result.type}`;
        const iconImageName = Icons[key] || Icons["default"];
        const IconUrl = require(`../images/${iconImageName}`);

        var myIcon = new L.Icon({
            iconUrl: IconUrl,
            iconSize: [30,30]
        });

        // set the marker for the location 
        let location = L.marker([result.lat, result.lon], {icon: myIcon})
                .addTo(map)
                .bindPopup(`<p class="name">${result.name}</p>
                            <p class="display-name">${result.display_name}</p>`);

        previousLoc.current = location;
    }

    useEffect(()=>{
        // functionality to close the results when clicked outside of it
        const closeHandler = (event) =>{
            if (!resultsRef.current.contains(event.target)) 
                setIsOpen(false);
        }

        document.addEventListener('mousedown', closeHandler);

        return () =>{
            document.removeEventListener('mousedown', closeHandler);
        }
    },[]);

    return (
        <div>
            <ul id="results" ref={resultsRef} className={isOpen ? "active" : "inactive"}>
                {filters.length > 0 && (<li className="filterOption-container">
                    {filters.map((filter) => {
                        return (<div key={filter}
                        className={`filter-option ${selectedFilter === filter ? 'filterOptionSelected' : ''}`}
                        onClick={() => filterClick(filter)}
                        >{filter}</div>)
                    })}
                </li>)}
                {results.length > 0 ? (
                    results.map((result, index) => {
                        return (<li key={index} className='list-style' onClick={() => resultClick(result)}>
                            <p className="name">{result.name}</p>
                            <p className="display-name">{result.display_name}</p>
                        </li>)
                    })
                ):(<li className='no-results'>No Results</li>)
                }
            </ul>
        </div>
    )
}
