import { useRef, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, addDoc, deleteDoc, getDocs, query, where, orderBy } from "firebase/firestore";

import '../App.css'

import SearchBox from '../components/SearchBox.jsx';
import GenWorldMap from '../components/GenWorldMap.jsx';


export default function Homepage() {
    const [cities, setCities] = useState([]);
    // why should I use this?


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


    return (
        <>
            <SearchBox>

                <hr />

                <GenWorldMap />

            </SearchBox>

        </>
    );
}