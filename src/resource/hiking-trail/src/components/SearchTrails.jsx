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
        <main>
          {/* trail name input */}
          <form className="trail-form" onSubmit={onFormSubmit}>
            <label htmlFor="trail-input">Enter a Trail Name:</label>
            <input id="trail-input" type="text" placeholder="Enter at least 1 character" required pattern="[a-zA-Z\-\s]+" minLength="1"
              title="Enter at least one character. Use only upper case, lower case, a space or hyphens"></input>
            <button type="submit" className="submit-btn">Search</button>
          </form>

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