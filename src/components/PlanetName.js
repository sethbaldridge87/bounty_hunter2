import React from 'react';

function PlanetName(props) {
    return (
        <div id="planetName" className="container console"><h5>{props.name}</h5></div>
    )
}

export default PlanetName;