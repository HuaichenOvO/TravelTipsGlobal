import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { collection, query, where, doc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import db from "../../db.js";

import Navbar from '../components/Navbar.jsx';
import Note from '../components/Note.jsx';
import PopupWindow from '../components/PopupWindow.jsx';

export default function NotePage() {
    const [refresh, setRefresh] = useState(null);
    const [notes, setNotes] = useState(null);
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
            resolve(tmpPageID);
        })

        fetchNotePromise
            .then((tmpPageID) => {
                // console.log(tmpPageID)
                const q = query(collection(db, "Note"), where("CID", "==", tmpPageID));
                const res = getDocs(q)
                // console.log(res)
                return res
            })
            .then((docSnapshot) => {
                let noteArray = []
                if (docSnapshot !== undefined) {
                    // console.log(docSnapshot.docs)
                    noteArray = docSnapshot.docs.map(
                        doc => <Note key={doc.id} docID={doc.id} data={doc.data()} onDeleteNote={onDeleteNote} />
                    )
                }
                return noteArray
            })
            .then(
                (noteArray) => setNotes(noteArray)
            )
            .catch(err => console.error("Error", err))
    }, [refresh]);

    const onSubmitNote = async (obj) => {
        obj = { ...obj, CID: pageID }
        const docRef = await addDoc(collection(db, "Note"), obj);
        console.log("Document written with ID: ", docRef.id);
        setRefresh(docRef.id + '1');
    }

    const onDeleteNote = async (docID) => {
        console.log(docID);
        await deleteDoc(doc(db, "Note", docID));
        setRefresh(docID + '2');
    }

    return (
        <div className='row'>
            <Navbar />
            <div>
                <PopupWindow onSubmitObject={onSubmitNote} />
            </div>
            {notes ? (
                <div className="row">
                    {notes}
                </div>
            ) : (
                <p>Loading note...</p>
            )}

            <footer style={{ position: "fixed", bottom: "0", left: "0" }}>Current path: {pathname} | Current index: {pageID}</footer>
        </div>
    );
}

