import React, { useState } from 'react';

function ReportStatus() {
    // States for updating parking status

    const [status, setStatus] = useState('');

    // Handle posting status on submit
    const handlePost = async (event) => {
        event.preventDefault();

        const data = {
            "parkingLotStatus": status
        }

        // process the registration
        fetch('https://hiking-trail-app.herokuapp.com/hikingtrails/${trailId}/parking/${parkingId}', {
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
    )

}

export default ReportStatus