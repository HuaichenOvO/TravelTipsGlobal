import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../db.js";

import Navbar from "../components/Navbar.jsx";
import Note from '../components/Note.jsx';


export default function NotePage() {
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [pageID, setPageID] = useState(null);
    const location = useLocation();
    const { hash, pathname, search } = location;


    useEffect(() => {
        // console.log("Rendered")
        const fetchNotePromise = new Promise((resolve, reject) => {
            if (!pathname.includes("/note/")) {
                setPageID("No such index!");
                reject()
            }
            let tmpPageID = parseInt(pathname.slice(6));
            setPageID(tmpPageID);
            const q = query(collection(db, "Note"), where("CID", "==", pageID));
            resolve(q);
        })

        fetchNotePromise
            .then((q) => {
                const res = getDocs(q)
                // console.log(res)
                return res
            })
            .then((docSnapshot) => {
                let noteArray = []
                if (docSnapshot !== undefined) {
                    console.log(docSnapshot.docs)
                    noteArray = docSnapshot.docs.map(
                        doc => <Note key={doc.id} CID={doc.data().CID} content={doc.data().content} />
                    )
                }
                return noteArray
            })
            .then(
                (noteArray) => setNote(noteArray)
            )


            .catch(err => console.error("Error", err))



    }, []);

    // console.log(location);

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
            <p>Current index: {pageID}</p>
            <button onClick={() => navigate("/")}>Jump to home page</button>
        </div>
    );
}

