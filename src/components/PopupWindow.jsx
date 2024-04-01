import React, { useState } from 'react';
import PropTypes from "prop-types";

export default function PopupWindow({ onSubmitObject }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isResetDone, setIsResetDone] = useState(false);
    const [tNoteTitle, setTNoteTitle] = useState("");
    const [tContent, setTContent] = useState("");

    // Event handler to handle form submission
    // ////////???????????????????
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log(`PopupWindow | Title: ${tNoteTitle}, content: ${tContent}`);
        // Here, you can perform any further processing with the form values
        if (tNoteTitle.length > 0 && tContent.length > 0) {
            const tmpObj = {
                title: tNoteTitle,
                content: tContent
            };
            onSubmitObject(tmpObj);
        }
        else {
            window.alert("Invalid price input!");
        }
        setTNoteTitle("");
        setTContent("");
        setIsOpen(false);
    };

    const formComponent =
        <form onSubmit={handleSubmit}>
            <div className="card" style={{ width: "25rem", padding: "15px", margin: "25px" }}>
                <h6><b>Add your note</b></h6>
                <div className="row g-6 align-items-center" style={{ margin: '10px' }}>
                    <div className="col-auto">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Note title
                        </label>
                    </div>

                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="exampleFormControlInput1"
                            value={tNoteTitle}
                            onChange={(e) => setTNoteTitle(e.target.value)}
                            placeholder="wats your nice title 🤠"
                        />
                    </div>
                </div>
                <div className="row g-2 align-items-center" style={{ margin: '10px' }}>
                    <div className="col-auto">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Content
                        </label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="exampleFormControlInput3"
                            value={tContent}
                            onChange={(e) => setTContent(e.target.value)}
                            placeholder="peace & love ❤️"
                        />
                    </div>
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group me-2" role="group" aria-label="First group">
                        <button className="btn btn-warning btn-sm" type='reset' onClick={() => setIsOpen(false)}>
                            Cancel </button>
                    </div>
                    <div className="btn-group me-2" role="group" aria-label="Second  group">
                        <button className="btn btn-primary btn-sm" type='submit'>
                            Comfirm </button>
                    </div>
                </div>
            </div>
            {/* ------------------- */}



        </form>;

    if (!isOpen) {
        if (!isResetDone) {
            setTNoteTitle("");
            setTContent("");
            setIsResetDone(true);
        }
        return <button className="btn btn-outline-success" onClick={() => { setIsOpen(!isOpen) }}>Add note</button>;
    }
    else {
        if (isResetDone) {
            setIsResetDone(false);
        }
        return (

            <div className="popup-overlay">
                {formComponent}
            </div>
        );
    }
}

PopupWindow.propTypes = {
    // isOpen: PropTypes.bool.isRequired,
    onSubmitObject: PropTypes.func.isRequired,
};
