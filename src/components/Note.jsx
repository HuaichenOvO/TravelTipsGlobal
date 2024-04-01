import React from 'react';

export default function Note({ data, onDeleteNote, docID }) {

    return (
        <div className="card" style={{ width: "18rem", padding: "10px", margin: "20px" }}>
            <div className="card-header">
                {data.title}
            </div>
            <ul className="list-group list-group-flush">
                {/* <li className="list-group-item">Note of city {data.CID}</li> */}
                <li className="list-group-item">{data.content}</li>
                {/* <li className="list-group-item">A third item</li> */}
            </ul>
            <button onClick={() => { onDeleteNote(docID) }}>Delete</button>
        </div>
    );
}
