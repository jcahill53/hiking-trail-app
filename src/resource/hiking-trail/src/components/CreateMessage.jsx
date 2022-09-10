import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CreateMessage() {
    const { id } = useParams();

    // use state to get message
    const [postMessage, setPostMessage] = useState(null);

    // get trailId from parameter
    const trailId = id;

    // get userId from local storage -- we need something to handle if there is no user logged in
    let newObj = window.localStorage.getItem("loginData",);
    let loggedUser = JSON.parse(newObj);
 
    const userId = loggedUser.userId;

    // Handle the login on submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "trailId": trailId,
            "userId": userId,
            "messageBody": postMessage,
            "createDayTime": new Date(),
            "updatedDayTime": new Date(),
        }

        // process the registration
        fetch(`https://hiking-trail-app.herokuapp.com/hikingtrails/${trailId}/comments`, {
            method: 'POST', // or 'PUT'
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
        <section className="register">
            <div className="register-form">
                <div>
                    <h2>Post a message about this trail</h2>
                </div>

                <form>
                    {/* Labels and inputs for form data */}

                    <div className="form-container">
                        <label className="register-label">Enter Your Comment</label>
                        <input className="register-input"
                            onChange={(e) => setPostMessage(e.target.value)}
                            value={postMessage}
                            type="text"
                            autoComplete="on"
                            required
                        />
                    </div>

                    <div className="row button-container">
                        <Link to={`/hikingTrails`}><button className="register-btn">Return to Search</button></Link>
                        <button onClick={handleSubmit} className="register-btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateMessage