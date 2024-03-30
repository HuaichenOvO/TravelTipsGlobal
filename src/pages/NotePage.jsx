import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../db.js";

import Navbar from "../components/Navbar.jsx";
import Note from '../components/Note.jsx';


export default function NotePage({ pageNumber }) {
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const location = useLocation();
    const { hash, pathname, search } = location;
    const { currentIndex } = useParams();


    useEffect(() => {
        const fetchFirestore = async () => {
            const q = query(collection(db, "Note"), where("NID", "==", 1));

            await getDocs(q)
                .then((docs) => {
                    let noteComponents = [];
                    docs.forEach((doc) => {
                        noteComponents.push(<Note key={doc.id} NID={doc.data().NID} content={doc.data().content} />)
                    })
                    return noteComponents;
                })
                .then((notes) => {
                    setNote(notes);
                })
                .catch(err => console.error("Error", err))
        };

        fetchFirestore();

    }, []);

    return (
        <div>
            <Navbar />
            {note ? (
                <div className="row">
                    {note}
                </div>
            ) : (
                <p>Loading note...</p>
            )}
            <p>Current path: {pathname}</p>
            <p>Current index: {currentIndex}</p>
            <button onClick={() => navigate("/")}>Jump to home page</button>
        </div>
    );
}

