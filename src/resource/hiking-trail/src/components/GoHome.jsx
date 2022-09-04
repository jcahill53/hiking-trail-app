
import React from 'react';
import { Link } from 'react-router-dom';

function GoHome() {

    return (
        <div >
            <Link to={`/`}><button className="welcome-button">Home</button></Link>
        </div>
    )

}

export default GoHome

