import React, { useState } from 'react';
import '../App.css';
import TrailResults from "./TrailResults"


function SearchTrails() {
  // use state for form submission of hero name
  const [trailsInput, setTrailsInput] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    setTrailsInput(event.target[0].value);
   
  };

  console.log(trailsInput);

  return (
    <>
      <main >
        {/* trail name input */}
        <section className="search-trail center">
          <h2 className="search-app"> App Name </h2>
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

export default SearchTrails