import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import '../App.css';
import TrailResults from "./TrailResults"
function SearchTrails() {
  // use state for form submission of trail name
  const [trailsInput, setTrailsInput] = useState('');
  // const [authenticated, setAuthenticated] = useState(null);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setTrailsInput(event.target[0].value);
   
  };

  console.log(trailsInput);

  const loggedInUser = localStorage.getItem("authenticated");
  //console.log(`LoggedInUser: ${loggedInUser}`);

  useEffect(() => {
    // const loggedInUser = localStorage.getItem("authenticated");
    // if (loggedInUser) {
    //   setAuthenticated(loggedInUser);
    // }
  }, []);

  // console.log(`Authenticated: ${authenticated}`);

  if (!(loggedInUser) || loggedInUser == null) {

  // Redirect to login page
  return <Navigate replace to="/login" />;

  } else {
  return (
    <>
      <main >
        {/* trail name input */}
        <section className="search-trail center">
          <h2 className="app-name"> ParkNHike </h2>
          <h2 className="srch-trl-ttl">Search for a Trail</h2>
          <form className="trail-form " onSubmit={onFormSubmit}>
            <label className="search-label center" htmlFor="trail-input">Enter a Trail Name:</label>
            <input id="trail-input" className="search-input center" type="text" placeholder="Enter at least 1 character" required pattern="[a-zA-Z\-\s]+" minLength="1"
              title="Enter at least one character. Use only upper case, lower case, a space or hyphens"></input>
            <button type="submit" className="search-button center">Search</button>
          </form>
        </section>
        <div className="container ">
          {trailsInput && <TrailResults
            trailsInput={trailsInput}
          />}
        </div>
      </main>
      </>
    )
  }
}

export default SearchTrails