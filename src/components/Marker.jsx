import React from 'react';

// import parks from '../../parks.js'
export function Marker({ onClick, children, feature }) {
    const _onClick = () => {
        onClick(feature.properties.description);
    };

    // console.log(feature)

    return (
        <div onClick={_onClick} className="marker" style={{ padding: "20px" }}>
            {children}
        </div>
    );
}
;
