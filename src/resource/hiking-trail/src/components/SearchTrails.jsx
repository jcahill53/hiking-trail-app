import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';
import { getTrailsByName } from '../../../../../datainterface/hikingtrails';

function SearchTrails() {
    const [trailsInput, setTrailsInput] = useState('');
    const navigate = useNavigate();
    const onFormSubmit = (event) => {
      event.preventDefault();
      navigate(`/hikingtrails/${trailsInput}`)
      console.log(trailsInput);
    };
    

    useEffect(() => {
      getTrailsByName.then(snapshot => {
          console.log(snapshot);
      })
  }, [])
  
    return (
     <div>
        <h1>Search Trail Here</h1>
        {/* Trail name input */}
        <form className="trail-form">
          <label htmlFor="trail-input">Enter part of a trail name:</label>
          <input id="trail-input" type="text" 
              placeholder="Enter at least 1 character" 
              required 
              pattern="[a-zA-Z\-\s]+" 
              minLength="1"
              title="Enter at least one character. Use only upper case, lower case, a space or hyphens"
              value = {trailsInput}
              onChange = {e => setTrailsInput(e.target.value)}/>

           <button type="submit" 
                    onClick = {onFormSubmit}
                    className="submit-btn">Search</button> 
        </form>

        {/* <div className="container ">
          {trailsInput && <SearchTrails trailsInput={trailsInput}
          />}
        </div> */}
      </div>
    )

}

export default SearchTrails