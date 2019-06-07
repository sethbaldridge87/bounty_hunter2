import React from 'react';

function PlanetImage(props) {
    return (
        <div id="planetImage" className="container"><img src={"images/" + props.source} alt="" /></div>
    )
}

export default PlanetImage;