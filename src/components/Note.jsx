import React from 'react';

export default function Note({ NID, content }) {
    return (
        <div className="card" style={{ width: "18rem", padding: "10px", margin: "20px" }}>
            <div className="card-header">
                Featured
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Note of city {NID}</li>
                <li className="list-group-item">{content}</li>
                <li className="list-group-item">A third item</li>
            </ul>
        </div>
    );
}
