import { useRef, useState, useEffect } from 'react';
import db from "../db.js";
import GeoAPI from '../GeoAPI.js'
import { collection, doc, onSnapshot, setDoc, addDoc, deleteDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

function Dropdown() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
          {/* <img src={user}></img> */}
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
          <h3>The Kiet<br /><span>Website Designer</span></h3>
          <ul>
            <li>Yup</li>
            <li>Yup</li>
            <li>Yup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [cities, setCities] = useState([]);
  // why should I use this?
  const [geoAPIresult, setGeoAPIresult] = useState([]);

  useEffect(
    () => {
      onSnapshot(collection(db, "Cities"), (snap) => {
        setCities(snap.docs.map((docData) => docData.data()));
      })
    }, []
  );


  const addCity = async (query) => {
    const dbCities = collection(db, 'Cities');
    console.log(query);
    await addDoc(dbCities, { Location: { _lat: 100, _long: 100 } });
  }



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



  return (
    <>
      <SearchBox onSearch={searchCity} />


      {/* https://github.com/thekietvuong/Dropdown-Menu-in-React/blob/master/src/App.js */}


      {/* <DropdownMenu /> */}
      <Dropdown />

      {cities.map((city, index) =>
      (<div key={index}>
        <p>{city.Location._lat}, {city.Location._long}</p>
      </div>)
      )}
    </>
  );
}

export default App;
