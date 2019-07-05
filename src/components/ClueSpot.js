import React from 'react';

function ClueSpot(props) {
    return (
        <div id="location" className="container console">
            <h5>{props.data.name}</h5>
            <div className="row">
                <div className="col-sm-3">
                    <h5>{props.data.character}</h5>
                    <img src={"images/characters/" + props.data.portrait} alt="Portrait" />
                </div>
                <div className="col-sm-9">
                    <p>{props.nextData}</p>
                </div>
            </div>
        </div>
    )
}

export default ClueSpot;