import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import trailImg from '../images/trail.jfif';

export default function TrailCard({ trail, trailId,  trailDifficulty, trailDistanceValue, trailDistanceMeasure, trailGainValue, trailGainMeasure}) {
   
    return (
        // return info for each trail
        <article className="trail-container  row">
            <div className="trail-card-img">
                <img className="detail-image" src={trailImg} alt={"A path in the mountains"} />
            </div>
 
            <div className="trail-card column" key="_id">
                <h3>Trail Name: {trail.name}</h3>
                <h3>Id: { trailId}</h3> 
                <p>Difficulty: {trailDifficulty}</p>
                <p>Distance:  {trailDistanceValue} {trailDistanceMeasure}</p>
                <p>Elevation Gain: {trailGainValue} {trailGainMeasure}</p>
                
            </div>
 
            <div className="card-button" >
                {/*link to Trails Details component  */}
                <Link to={`/hikingtrails/${trailId}`}><button  >Details</button></Link>
            </div>
        </article>

    )
}

TrailCard.propTypes = {
    trail: PropTypes.object.isRequired,
    _id: PropTypes.string ,

}

