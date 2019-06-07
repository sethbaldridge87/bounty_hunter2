import React from 'react';

function Spaceport(props) {
    let world_list = props.worlds;
    console.log(world_list);
    for (let i = 0; i < world_list.length; i++) {
        console.log(world_list[i]);
    }
    return (
        <div id="space_port" className="col-md-4 console">
            <h5>Spaceport</h5>
            <hr />
                {props.worlds.map(data => (
                    <p onClick={(event) => props.travel(data)}>{data}</p>
                ))}
        </div>
    )
}

export default Spaceport;