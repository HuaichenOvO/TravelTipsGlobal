// import { collection, getDocs } from 'firebase/firestore';
// import db from './db.js';

const parks = [
    {
        "type": "Feature",
        "properties": {
            "title": "Lincoln Park",
            "description": "A northside park that is home to the Lincoln Park Zoo"
        },
        "geometry": {
            "coordinates": [-87.637596, 41.940403],
            "type": "Point"
        }
    },
    {
        "type": "Feature",
        "properties": {
            "title": "Burnham Park",
            "description": "A lakefront park on Chicago's south side"
        },
        "geometry": {
            "coordinates": [-87.603735, 41.829985],
            "type": "Point"
        }
    },
    {
        "type": "Feature",
        "properties": {
            "title": "Millennium Park",
            "description": "A downtown park known for its art installations and unique architecture"
        },
        "geometry": {
            "coordinates": [-87.622554, 41.882534],
            "type": "Point"
        }
    },
    {
        "type": "Feature",
        "properties": {
            "title": "Grant Park",
            "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
        },
        "geometry": {
            "coordinates": [-87.619185, 41.876367],
            "type": "Point"
        }
    }
];

export default parks

// let cityArray = [];
// const fetchDocs = new Promise((resolve, reject) => {
//     const res = getDocs(collection(db, "City"));
//     resolve(res);
// })

// fetchDocs
//     .then((querySnapshot) => {
//         console.log("before", cityArray);
//         querySnapshot.forEach((doc) => {
//             // console.log(doc.data());
//             cityArray.push(doc.data())
//         });
//         return cityArray;
//     })
//     .then((cityArray) => {
//         // console.log(cityArray);
//         console.log(cityArray);
//     })
//     .then(() => {
//         console.log(parks)
//     })
//     .catch(err => console.error(err))
