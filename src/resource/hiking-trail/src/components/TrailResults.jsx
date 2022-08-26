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
    console.log(trailName);
    const url = `http://localhost:5000/hikingtrails/name/${trailName}`;
console.log(url);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(
                // successful callback
                data => {
                    setTrailResults(data);
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

    // use only results from data fetch
    // const trails = trailResults.data.results;
    console.log(trailResults);

   return (
        <>
        {/* trail cards */}
        <section className="column" >

            {trailResults.map((trail, id) =>
                <TrailCard
                    key={id}
                    trail={trail}
                />
            )}
        </section>

    </>

    )

            }
TrailResults.propTypes = {
    trailsInput: PropTypes.string.isRequired
}

