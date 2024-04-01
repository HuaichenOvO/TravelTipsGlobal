import React, { useState, useRef } from 'react';
import GeoAPI from '../../GeoAPI.js'
import { CityCandidate } from './CityCandidate.jsx';

export default function SearchBox({ children, refreshMap }) {
    const [query, setQuery] = useState('');
    const [geoAPIresult, setGeoAPIresult] = useState([]);
    const [isResultReady, setIsResultReady] = useState(false);
    const resultButton = useRef(null);

    let results = {};

    const searchCity = async (query) => {
        // const address = "SF";
        if (query === "") {
            console.log("Invalid input!");
            return;
        };

        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${GeoAPI}`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                results = geocodingResult.features.map((it) => it.properties)
                setGeoAPIresult(results);
                return results;
            })
            .then((geoResult) => {
                // console.log(geoResult)
                if (geoResult.length > 0) {
                    // geoResult.forEach(it => console.log(it));
                    setIsResultReady(true);
                    if (resultButton.current.getAttribute("aria-expanded") === "false") {
                        resultButton.current.click();
                    }
                }
                else {
                    console.log("No results");
                    setIsResultReady(false);
                }
            })
            .catch(error => console.error(error));
    }

    const onAddCity = (newID) => {
        resultButton.current.click();
        refreshMap(newID);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery("");
        searchCity(query);
    };

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit" style={{ margin: "10px" }}>Search</button>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" ref={resultButton}>Results</button>
                <div className="collapse" id="collapseExample">
                    {isResultReady ?
                        geoAPIresult.map((it, i) => <CityCandidate key={i} data={it} onAddHandle={onAddCity} />)
                        :
                        <></>
                    }
                </div>
            </form>


            {children}


        </div>
    );
}
