import { useRef, useState, useEffect } from 'react';
import GeoAPI from '../../GeoAPI.js'
import { collection, doc, onSnapshot, setDoc, addDoc, deleteDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import '../App.css'

import SearchBox from '../components/SearchBox.jsx';
import GenWorldMap from '../components/GenWorldMap.jsx';


export default function Homepage() {
    const [cities, setCities] = useState([]);
    // why should I use this?
    const [geoAPIresult, setGeoAPIresult] = useState([]);

    // useEffect(
    //   () => {
    //     onSnapshot(collection(db, "Cities"), (snap) => {
    //       setCities(snap.docs.map((docData) => docData.data()));
    //     })
    //   }, []
    // );


    // const addCity = async (query) => {
    //   const dbCities = collection(db, 'Cities');
    //   console.log(query);
    //   await addDoc(dbCities, { Location: { _lat: 100, _long: 100 } });
    // }



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
            <div>
                <SearchBox onSearch={searchCity} />
            </div>

            <hr />

            {/* 
            <div>
                <MapChart />
            </div> */}

            <div>
                <GenWorldMap />
            </div>

        </>
    );
}