import React from 'react';
import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';
import db from "../../db.js";

export function CityCandidate({ data, onAddHandle }) {
    const clickHandle = async (event) => {
        const q1 = query(collection(db, "City"), orderBy("CID"));
        const res = await getDocs(q1);
        const lastIndex = res.docs[res.docs.length - 1].data().CID;
        const newIndex = parseInt(lastIndex) + 1;

        const obj = {
            CID: newIndex,
            type: "Feature",
            geometry: {
                coordinates: [data.lon, data.lat],
                type: "Point"
            },
            properties: {
                description: `${data.city} is in ${data.country}`,
                title: data.city
            },
        };
        // console.log(obj)
        const docRef = await addDoc(collection(db, "City"), obj);
        console.log("Document written with ID: ", docRef.id);
        onAddHandle(docRef.id);
    };


    return (
        <>
            <hr />
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <th scope="col"> {data.city}, {data.country}</th>
                        <th scope="col" rowSpan={2} style={{ display: "block", margin: "auto" }}>
                            <button onClick={clickHandle} type='button'>add</button>
                        </th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th scope="row">Location: ({data.lon}, {data.lat})</th>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
