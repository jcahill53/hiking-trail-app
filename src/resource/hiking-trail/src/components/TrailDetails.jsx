import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import TrailComments from "./TrailComments"
 

// const { REACT_APP_NAME} = process.env

function TrailDetails() {
    const {  id } = useParams();

    // use states for data fetch
    const [trailDetails, setTrailDetail] = useState([]);
    const [trailComments, setTrailComments] = useState([]);
    const [trailParking, setTrailParking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // url variables

    const trailId =  id;
console.log(id);
console.log(trailId);

    // trail by id api
    const url = `http://localhost:5000/hikingtrails/${trailId}`;
    console.log(url);

    // comments for a trail api
    const commentUrl = `http://localhost:5000/hikingtrails/${trailId}/comments`;
    console.log(commentUrl);

    // parking for a trail api
    const parkingUrl = `http://localhost:5000/hikingtrails/${trailId}/parking`;
    console.log(parkingUrl);

    //    fetch data for both hero and comics for the hero
    useEffect(() => {

        // use axios to fetch data from multiple urls
        const fetchData = () => {
            const getTrailDetail = axios.get(url)
            const getTrailComments = axios.get(commentUrl)
            const getTrailParking = axios.get(parkingUrl)

            axios.all([getTrailDetail, getTrailComments, getTrailParking])
                .then(
                    axios.spread((...allData) => {
                        const allTrailDetail = allData[0].data
                        const allTrailComments = allData[1].data
                        const allTrailParking = allData[2].data

                        setTrailDetail(allTrailDetail)
                        setTrailComments(allTrailComments)
                        setTrailParking(allTrailParking)
                        setIsLoading(false);
                    })

                ).catch(err => {
                    setHasError(true)
                    setIsLoading(false);
                });

        }
        fetchData()

    }, [parkingUrl, commentUrl, url]);

    // during load show Pow image and Loading...
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

    // variables to be used in return

    // use only results from data fetch
    // const detail = trailDetails.data.results;
    // const comments = trailComments.data.results;
    // const parking = trailParking.data.results;


    // variable for hero description
    const trailDescr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    

    
    return (
        <section>
            <section className="trail-info">
                  <h2 className="app-name">App.name</h2>
                <h1 className="detail-hdr">{trailDetails.name}</h1>

                <p>${trailDescr}</p>
            </section>

            <section className="parking-info">
                <h2 className="detail-hero-comics">App Name Real Time Statistics</h2>
                <h2 className="app-name"> </h2>
                <p>{trailDetails.name}</p>
                <div>
                    <div>
                    <p>Parking Lot Status</p>
                    <p>{trailParking.parkingLotStatus}</p>
                    </div>

                    <div>
                    <p>Parking Type</p>
                    <p>Free</p>
                    </div>
                    
                    <div>
                    <p>App Users Here</p>
                    <p>10</p>
                    </div>
                </div>

                <div>
                    <div>
                    <p>Emptiest Day/Time</p>
                    <p>{trailParking.fullest_day_time}</p>
                    </div>

                    <div>
                    <p>Emptiest Day/Time</p>
                    <p>{trailParking.emptiest_day_time}</p>
                    </div>


                </div>


            </section>

            <section className="comment-info">
                <article className="row comment-card" >
                    {trailComments.map((comment, id) =>
                        <TrailComments
                            key={id}
                            comment={comment}

                        />
                    )}
                </article>
            </section>
        </section>
    )
}

export default TrailDetails