import React from 'react';

function PlanetImage(props) {
    return (
        <div id="planetImage" className="container"><img src={"images/planets/" + props.source} alt="" /></div>
    )
}

export default PlanetImage;