import React, { useEffect, useState } from 'react';
import TrailCard from './TrailCard';
import PropTypes from 'prop-types'


export default function TrailResults({ trailsInput }) {
    // use states for hero card
    const [trailResults, setTrailResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // variables to create url
    let trailName = trailsInput;

    const url = `https://hiking-trail-app.herokuapp.com/hikingtrails/name/${trailName}`;


 
    useEffect(() => {
        fetch(url)
            .then(response => {
                if(response.status === 404 || response.status === 500){
                    setHasError(true)
                    setIsLoading(false);
                   
                    
                }
                else{
                    return response.json();
                }
           })
            .then(
                // successful callback
                data => {
 
                    setTrailResults(data);
                    console.log(data);
                    setIsLoading(false);
                },
                // unsuccessful callback
                error => {
 
                    setHasError(true)
                    setIsLoading(false);
                }
            );


    }, [url]);

    // during load show  Loading...
    if (isLoading) {
        return (
            <div className="wait">
                <p className="load">Loading...</p>
            </div>
        )
    }
    // return message if fetch results in error
    if (hasError) {
        
        return <p>An error has occurred.  Please try again.</p>
    }

    return (
        <>
        {/* trail cards */}
        <section className="column" >

            {trailResults.map((trail,  _id) =>
   
                <TrailCard
                    key={_id}
                    trail={trail}
                    trailId = {trail._id}
                    trailDifficulty = {trail.measures.difficulty}
                    trailDistanceValue = {trail.measures.distance.value}
                    trailDistanceMeasure = {trail.measures.distance.measure}
                    trailGainValue = {trail.measures.elevationGain.value}
                    trailGainMeasure = {trail.measures.elevationGain.measure}
                    
                />
            )}
        </section>

    </>
    )

}

TrailResults.propTypes = {
    trailsInput: PropTypes.string.isRequired
}