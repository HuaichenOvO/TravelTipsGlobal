import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";

const geoUrl = "countries-50m.json";

function MyMarker({ markerObj, zoom }) {
    const getSize = (value) => value / zoom;

    const onClickShownCoordinate = (e) => {
        // e.target.coordinates !== undefined ? console.log(e.target.coordinates) : console.log("None");
        console.log(markerObj.coordinates)
    };

    return (
        <Marker coordinates={markerObj.coordinates}>
            <>
                <a href={`/note/${markerObj.id}`}>
                    <text textAnchor="middle" fill="#F53" style={{ "fontSize": getSize(16.0) }} onClick={onClickShownCoordinate}>{markerObj.city}</text>
                    <circle r={getSize(3.0)} fill="orange" />
                </a>
            </>
        </Marker>
    )

}

function Markers({ zoom }) {

    const [cities, setCities] = useState([
        {
            id: 1,
            city: "San Francisco",
            coordinates: [-122.431297, 37.773972],
        },
        {
            id: 2,
            city: "Los Angeles",
            coordinates: [-118.243683, 34.052235],
        },
        {
            id: 3,
            city: "New York",
            coordinates: [-73.935242, 40.730610],
        },
    ]);

    return (
        <>
            {cities.map(
                (it, index) => <MyMarker key={index} zoom={zoom} markerObj={it} />
            )}
        </>
    )
}

function MapControl({ position, setPosition }) {
    function handleZoomIn() {
        if (position.zoom >= 64) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    function handleRecenter() {
        setPosition((pos) => ({ ...pos, coordinates: [0, 0], zoom: 1 }));
    }

    return (
        <div className="controls">
            <button onClick={handleZoomIn}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="grey"
                    strokeWidth="3"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
            <button onClick={handleRecenter}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="grey"
                    strokeWidth="3"
                >
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
            </button>
            <button onClick={handleZoomOut}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="grey"
                    strokeWidth="3"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
}

function MapChart() {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    function handleMoveEnd(position) {
        setPosition(position);
    }

    return (
        <div>
            {/* <img src="location.svg" /> */}
            {/* <ComposableMap> */}
            <ComposableMap width={800} height={600}
                projection={"geoEqualEarth"}
                projectionConfig={{
                    scale: 155,
                }} >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} />
                            ))
                        }
                    </Geographies>
                    {/* Markers */}
                    <Markers zoom={position.zoom} />
                </ZoomableGroup>
            </ComposableMap>
            <MapControl position={position} setPosition={setPosition} />
        </div>
    );
};

export default MapChart;
