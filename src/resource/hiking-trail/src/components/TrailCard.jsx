import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export default function TrailCard({trail, id}) {
console.log(trail.name)
    return (
        // return info for each hero
        <article className="trail-container">
            <div className="trail-card row" key="id">
                <h3>{trail.name}</h3>
                {/*link to Trails Details component  */}
                <Link to={`/hikingtrails/:id`}><button className="info-btn center" >More Info</button></Link>
            </div>
        </article>


    )
}

TrailCard.propTypes = {
    trail: PropTypes.object.isRequired,

}

 