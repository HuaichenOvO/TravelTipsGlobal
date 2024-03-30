import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import geoJson from "../../src/assets/chicago-parks.json";

function Marker({ onClick, children, feature }) {
    const _onClick = () => {
        onClick(feature.properties.description);
    };

    return (
        <div onClick={_onClick} className="marker" style={{ padding: "20px" }}>
            {children}
        </div>
    );
};

function GLMap() {
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-87.9);
    const [lat, setLat] = useState(41.35);
    const [zoom, setZoom] = useState(9);

    const [clickedLng, setClickedLng] = useState(0);
    const [clickedLat, setClickedLat] = useState(0);

    const TOKEN = 'pk.eyJ1Ijoia2FpLWxpbiIsImEiOiJjbHVhdnlyejIwb2I3Mml0NWdxNjlub3kzIn0.1rOhREHHqBtilP4tyK9viw';

    const parks = [
        {
            "type": "Feature",
            properties: {
                "title": "Lincoln Park",
                "description": "A northside park that is home to the Lincoln Park Zoo"
            },
            geometry: {
                "coordinates": [-87.637596, 41.940403],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            properties: {
                "title": "Burnham Park",
                "description": "A lakefront park on Chicago's south side"
            },
            geometry: {
                "coordinates": [-87.603735, 41.829985],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            properties: {
                "title": "Millennium Park",
                "description": "A downtown park known for its art installations and unique architecture"
            },
            geometry: {
                "coordinates": [-87.622554, 41.882534],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            properties: {
                "title": "Grant Park",
                "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
            },
            geometry: {
                "coordinates": [-87.619185, 41.876367],
                "type": "Point"
            }
        }];

    // // check
    // const markerClicked = (title) => {
    //     window.alert(title);
    //     // history;
    // };

    mapboxgl.accessToken = TOKEN;

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on("load", function () {
            // Add an image to use as a custom marker
            map.current.loadImage(
                "../../public/location_resize.png",
                function (error, image) {
                    if (error) throw error;
                    map.current.addImage("custom-marker", image);
                    // Add a GeoJSON source with multiple points
                    map.current.addSource("points", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            // -----------------
                            features: parks,
                        },
                    });
                    // Add a symbol layer
                    map.current.addLayer({
                        id: "points",
                        type: "symbol",
                        source: "points",
                        layout: {
                            "icon-image": "custom-marker",
                            // get the title name from the source's "title" property
                            "text-field": ["get", "title"],
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-offset": [0, 1.25],
                            "text-anchor": "top",
                        },
                    });
                }
            );
        });

        // Render custom marker components
        parks.forEach((feature) => {
            // Create a React ref
            const ref = React.createRef();
            // Create a new DOM node and save it to the React ref
            ref.current = document.createElement('div');
            // Render a Marker Component on our new DOM node
            createRoot(ref.current).render(
                // <Routes>
                //     <Route path="/note/:id" element={<Posts />} />
                // </Routes>
                <Marker onClick={() => navigate("/note/1")} feature={feature} />
            );

            // Create a Mapbox Marker at our new DOM node
            new mapboxgl.Marker(ref.current)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map.current);
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', (e) => {
            setClickedLng(e.lngLat.lng.toFixed(4));
            setClickedLat(e.lngLat.lat.toFixed(4));
            // console.log(`A click event has occurred at`, e.lngLat)
        })

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // return () => map.current.remove();
    }, []);


    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            <p className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </p>
            <p className="sidebar">
                Clicked: {clickedLng} | Clicked: {clickedLat}
            </p>
        </div>
    );


}

export default function GenWorldMap() {


    return (<GLMap />);
};





