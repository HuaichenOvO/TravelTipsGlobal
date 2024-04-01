import { Link } from 'react-router-dom';

export default function Navbar({ note }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: "fixed", top: "0", left: "0" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home </Link>
                        </div>
                        {note ? <div className="nav-item"> {note} </div> : ""}
                    </div>
                </div>
            </nav>

        </>
    );
}