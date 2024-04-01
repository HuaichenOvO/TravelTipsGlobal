import React, { useState } from 'react';
import '../App.css'

import SearchBox from '../components/SearchBox.jsx';
import GenWorldMap from '../components/GenWorldMap.jsx';


export default function Homepage() {
    const [refresh, setRefresh] = useState(null);

    return (
        <>
            <SearchBox refreshMap={setRefresh}>

                <hr />

                <GenWorldMap refreshTrigger={refresh} />

            </SearchBox>

        </>
    );
}