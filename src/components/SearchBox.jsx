import { useState } from 'react';
import GeoAPI from '../../GeoAPI.js'

export default function SearchBox({ children }) {
    const [query, setQuery] = useState('');
    const [geoAPIresult, setGeoAPIresult] = useState([]);

    let results = {};

    const searchCity = async (query) => {
        // const address = "SF";

        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${GeoAPI}`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                results = geocodingResult.features.map((it) => it.properties)
                setGeoAPIresult(results);
                return results;
            })
            .then((geoResult) => {
                console.log(geoResult)
                if (geoResult.length > 0) {
                    geoResult.forEach(it => console.log(it));
                }
                else {
                    console.log("No results");
                }
            })
            // .then( 生成 dropdown 下拉显示若干城市 )
            // .then( 如果没有此城市则 Firebase 中新增此城市，有则进入此 doc 的笔记栏目 )
            .catch(error => console.error(error));
    }


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery("");
        searchCity(query);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Results
                </a>
                <ul className="dropdown-menu">
                    {geoAPIresult.map(
                        (it) => <li className="dropdown-item">
                            <p>Search city: {it.name} - {it.country}</p>
                            <p>Cordinite: [{it.lat}, {it.lon}]</p>
                        </li>
                    )}
                </ul>
            </form>


            {children}

            {/* <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </li> */}



        </div>
    );
}
