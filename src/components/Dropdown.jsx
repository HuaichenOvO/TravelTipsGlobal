import { useRef, useState, useEffect } from 'react';

export default function Dropdown() {

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    {/* <img src={user}></img> */}
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <h3>The Kiet<br /><span>Website Designer</span></h3>
                    <ul>
                        <li>Yup</li>
                        <li>Yup</li>
                        <li>Yup</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}