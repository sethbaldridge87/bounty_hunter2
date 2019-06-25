import React from 'react';

function PlanetDesc(props) {
    return (
        <div id="planetDesc" className="container console"><p>{props.text}</p></div>
    )
}

export default PlanetDesc;