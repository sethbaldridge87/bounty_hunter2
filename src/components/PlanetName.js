import React from 'react';

function PlanetName(props) {
    return (
        <div id="planetName" className="container"><h5>{props.name}</h5></div>
    )
}

export default PlanetName;