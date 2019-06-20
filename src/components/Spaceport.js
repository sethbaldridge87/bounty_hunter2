import React from 'react';

function Spaceport(props) {
    return (
        <div id="space_port" className="col-md-4 console">
            <h5>Spaceport</h5>
            <hr />
                {props.worlds.map(data => (
                    <p onClick={(event) => props.travel(data)} key={data}>{data}</p>
                ))}
        </div>
    )
}

export default Spaceport;