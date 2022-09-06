import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import TrailComments from "./TrailComments"
import Background from '../images/austin-ban-juHayWuaaoQ-unsplash.jpg'

/* ARTHUR summary of changes:
** - Added const trailHeaderSectionStyle with proper variables
** - Added class trail-header-section and background image
** - Add className="trail-details"
** - Add Trail Details section to app.css
*/


function TrailDetails() {
    const { id } = useParams();

    // use states for data fetch
    const [trailDetails, setTrailDetail] = useState([]);
    const [trailComments, setTrailComments] = useState([]);
    const [trailParking, setTrailParking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [status, setStatus] = useState('');

    const trailHeaderSectionStyle = {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    }

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
    const parkingId = trailParking[0]._id

    // Handle posting status on submit
    const handlePost = async (event) => {
        event.preventDefault();

        const data = {
            "parkingLotStatus": status,
        }

        // process the registration
        fetch(`http://localhost:5000/hikingtrails/${trailId}/parking/${parkingId}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    return (
        <div className="trail-details">
            <section className="trail-header-section" style={trailHeaderSectionStyle}>
                <section className="trail-info">

                    <h2 className="app-name">ParkNHike</h2>
                    <div className="trail-info-container">
                        <h1 className="detail-hdr">{trailDetails.name}</h1>

                        <div className="trail-stats">
                            <span><img id="location-pin" src="/pin.png" alt="" />
                                {trailDetails.locations.latitude}, {trailDetails.locations.longitude}
                            </span>

                            <span><img id="trail-distance" src="/travel.png" alt="" />
                                {trailDetails.measures.distance.value} {trailDetails.measures.distance.measure}
                            </span>

                            <span><img id="trail-difficulty" src="/speedometer.png" alt="" />
                                {trailDetails.measures.difficulty}
                            </span>
                        </div>


                        <p>{trailDetails.descr}</p>
                    </div>
                </section>
            </section>

            <section className="trail-details parking-info trail-info-container">

                <h2 className="trail-section-hdr"><span>ParkNHike</span> Real Time Statistics</h2>

                <h2 className="section-sub-hdr">{parkingName}</h2>
                <div className="column" >
                    <div className="row parking-data">
                        <div >
                            <p className="park-label">Parking Lot Status</p>
                            <p className="park-value">{parkingStatus}</p>
                        </div>

                        <div>
                            <p className="park-label">Parking Type</p>
                            <p className="park-value">{parkingType}</p>
                        </div>

                        <div>
                            <p className="park-label">App Users Here</p>
                            <p className="park-value">{usersHere}</p>
                        </div>
                    </div>

                    <div className="row parking-data">
                        <div>
                            <p className="park-label">Emptiest Day/Time</p>
                            <p className="park-value">{fullestDTTM}</p>
                        </div>

                        <div>
                            <p className="park-label">Emptiest Day/Time</p>
                            <p className="park-value">{emptiestDTTM}</p>
                        </div>


                    </div>
                </div>

            </section>

            <section className="trail-details parking-info trail-info-container">
                <section className="trail-details report-park-status trail-info-container">
                    <div >
                        <div>
                            <h2 className="trail-section-hdr">Report Changes in Parking Status</h2>
                        </div>


                        <form className="report-status-form">
                            {/* Labels and inputs for form data */}

                            <div className="form-container">
                                <label className="status-label">Select the Current Parking Status
                                    <input className="status-select"
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                        type="text"
                                        autoComplete="on"
                                        required
                                    /></label>
                            </div>
                            <div className="row button-container">
                                <button onClick={handlePost} className="welcome-button" type="submit">
                                    Post the Status of Parking
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>

            <section className="trail-details user-comments trail-info-container">
                <h2 className="trail-section-hdr"><span>ParkNHike</span>User Posted Comments</h2>
                <Link to={`/createmessage/${trailId}`}><button  >Post your own comment</button></Link>
                <section className="comment-info">
                    <article className="column comment-card" >
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
        </div>
    )
}

export default TrailDetails