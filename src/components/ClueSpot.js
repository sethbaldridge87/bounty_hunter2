import React from 'react';

function ClueSpot(props) {
    return (
        <div id="location" className="container">
            <h5>{props.data.name}</h5>
            <div className="col-sm-2">
                <h5>{props.data.character}</h5>
            </div>
            <div className="col-sm-10">
                <p>{props.nextData}</p>
            </div>
        </div>
    )
}

export default ClueSpot;