import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

import TrailComments from "./TrailComments"


// const { REACT_APP_NAME} = process.env

function TrailDetails() {
    const { id } = useParams();

    // use states for data fetch
    const [trailDetails, setTrailDetail] = useState([]);
    const [trailComments, setTrailComments] = useState([]);
    const [trailParking, setTrailParking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // url variables

    const trailId = id;

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

    // during load show Loading...
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


    // variables for parking info
    const parkingName = trailParking[0].name;
    const parkingStatus = trailParking[0].parkingLotStatus;
    const parkingType = trailParking[0].type;
    const usersHere = trailParking[0].usersThere
    const fullestDTTM = trailParking[0].fullest_day_time
    const emptiestDTTM = trailParking[0].emptiestDayTime

  
    return (
        <section>
            <section className="trail-info">
                <h2 className="app-name">App.name</h2>
                <h1 className="detail-hdr">{trailDetails.name}</h1>

                <p>${trailDetails.descr}</p>
            </section>

            <section className="parking-info">
                <h2 className="detail-hero-comics">ParkNHike Real Time Statistics</h2>
                <h2 className="app-name"> </h2>
                <p>{parkingName}</p>
                <div>
                    <div>
                        <p>Parking Lot Status</p>
                        <p>{parkingStatus}</p>
                    </div>

                    <div>
                        <p>Parking Type</p>
                        <p>{parkingType}</p>
                    </div>

                    <div>
                        <p>App Users Here</p>
                        <p>{usersHere}</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p>Emptiest Day/Time</p>
                        <p>{fullestDTTM}</p>
                    </div>

                    <div>
                        <p>Emptiest Day/Time</p>
                        <p>{emptiestDTTM}</p>
                    </div>


                </div>


            </section>
            <h1> User Posted Comments</h1>
            <Link to={`/createmessage/${trailId}`}><button  >Post your own comment</button></Link>
            <section className="comment-info">
                <article className="row comment-card" >
                    {trailComments.map((comment, id) =>
                        <TrailComments
                            key={id}
                            comment={comment}
                            messageBody={comment.messageBody}

                        />
                    )}
                </article>
            </section>
        </section>
    )
}

export default TrailDetails