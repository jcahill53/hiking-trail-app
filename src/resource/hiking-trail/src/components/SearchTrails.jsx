import React, { useState } from 'react';
import '../App.css';


function SearchTrails() {
    const [trailsInput, setTrailsInput] = useState('');
    const onFormSubmit = (event) => {
      event.preventDefault();
      setTrailsInput(event.target[0].value);
    };
    
  
    return (
        <main>
        <h1>Trails Search Page</h1>
        {/* Trail name input */}
        <form className="trail-form" onSubmit={onFormSubmit}>
          <label htmlFor="trail-input">Enter part of a trail name:</label>
          <input id="trail-input" type="text" placeholder="Enter at least 1 character" required pattern="[a-zA-Z\-\s]+" minLength="1"
            title="Enter at least one character. Use only upper case, lower case, a space or hyphens"></input>
           <button type="submit" className="submit-btn">Search</button> 
        </form>

        <div className="container ">
          {trailsInput && <SearchTrails
            trailsInput={trailsInput}
          />}
        </div>
      </main>
    )

}

export default SearchTrails