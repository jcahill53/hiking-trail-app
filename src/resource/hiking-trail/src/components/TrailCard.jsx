import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import trailImg from '../images/trail.jfif';

export default function TrailCard({ trail, _id }) {
   
    return (
        // return info for each hero
        <article className="trail-container row">
            <div>
                <img className="detail-image" src={trailImg} alt={"A path in the mountains"} />
            </div>
 
            <div className="trail-card column" key="_id">
                <h3>{trail.name}</h3>
                <h3>{trail._id}</h3>
            </div>
 
            <div>
                {/*link to Trails Details component  */}
                <Link to={`/hikingtrails`}><button className="info-btn center" >Details</button></Link>
            </div>
        </article>


    )
}

TrailCard.propTypes = {
    trail: PropTypes.object.isRequired,
    _id: PropTypes.string ,

}

