import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { collection, getDocs } from 'firebase/firestore';
import mapboxgl from 'mapbox-gl';
import db from '../../db.js';
import { Marker } from './Marker.jsx';

export default function GenWorldMap() {
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [parks, setParks] = useState([]);
    const [lng, setLng] = useState(-87.9);
    const [lat, setLat] = useState(41.35);
    const [zoom, setZoom] = useState(9);

    const [clickedLng, setClickedLng] = useState(0);
    const [clickedLat, setClickedLat] = useState(0);

    const TOKEN = 'pk.eyJ1Ijoia2FpLWxpbiIsImEiOiJjbHVhdnlyejIwb2I3Mml0NWdxNjlub3kzIn0.1rOhREHHqBtilP4tyK9viw';

    const LOGO = './src/assets/location_resize.png';

    mapboxgl.accessToken = TOKEN;

    useEffect(() => {
        if (map.current !== null) return;

        let cityArray = [];
        const fetchDocs = new Promise((resolve, reject) => {
            if (map.current !== null) {
                console.log("Map is not null");
                reject()
            }
            const res = getDocs(collection(db, "City"));
            resolve(res);
        })


        fetchDocs
            .then((querySnapshot) => {
                return querySnapshot.docs.map(it => it.data());
            })
            .then((cityArray) => {
                // set state will not finish until the effect ends?
                setParks(cityArray);
                return cityArray
            })
            .then((cityArray) => {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [lng, lat],
                    zoom: zoom
                });
                return cityArray;
            })
            .then((cityArray) => {
                map.current.on("load", function () {
                    // Add an image to use as a custom marker
                    map.current.loadImage(
                        // "../assets/location_resize.png",
                        LOGO,
                        function (error, image) {
                            if (error) throw error;
                            map.current.addImage("custom-marker", image);
                            // Add a GeoJSON source with multiple points
                            map.current.addSource("points", {
                                type: "geojson",
                                data: {
                                    type: "FeatureCollection",
                                    // -----------------
                                    features: cityArray,
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
                return cityArray;
            })
            .then((cityArray) => {
                // Render custom marker components
                cityArray.forEach((feature) => {
                    // Create a React ref
                    const ref = React.createRef();
                    // Create a new DOM node and save it to the React ref
                    ref.current = document.createElement('div');
                    // Render a Marker Component on our new DOM node
                    createRoot(ref.current).render(
                        <Marker onClick={() => navigate(`/note/${feature.CID}`)} feature={feature} />
                    );

                    // Create a Mapbox Marker at our new DOM node
                    new mapboxgl.Marker(ref.current)
                        .setLngLat(feature.geometry.coordinates)
                        .addTo(map.current);
                });
            })
            .then(() => {
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
            })

        return () => { map.current = null };
    }, []);

    return (
        <div className="row">
            {/* <div>{parks.map((it) => it.properties.title)}</div> */}
            <div ref={mapContainer} className="map-container" />
            <p className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </p>
            {/* <p className="sidebar">
                Clicked: {clickedLng} | Clicked: {clickedLat}
            </p> */}
        </div>
    );


}







