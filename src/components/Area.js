import React from 'react';

function Area(props) {
    return (
        <div id="investigate" className="col-md-4 console">
            <h5>Investigate</h5>
            <hr />
                {props.places.map(data => (
                    <p>{data}</p>
                ))}
        </div>
    )
}

export default Area;