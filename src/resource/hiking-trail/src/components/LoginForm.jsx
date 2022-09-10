import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import SearchTrails from "./SearchTrails";


function LoginForm() {
  const navigate = useNavigate();
  // States for login
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  

  console.log(`Email ${email}`);
  console.log(`Password ${password}`);

  // Handle the login on submit
  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      "email": email,
      "password": password
    }
 
    // process the login
    fetch(`https://hiking-trail-app.herokuapp.com/users/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('Success:', data);
        if (data.token !== '' || data.token !== null) {

          // define a new object for the reponse data
          const loginData = data

          // store authentication status and loginData object in local storage.  loginData must be stored as a string.
          localStorage.setItem("authenticated", true);
          localStorage.setItem("loginData", JSON.stringify(loginData));
          navigate("/hikingtrails");
        }
 
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate("/faillogin");
      });


  }
  return (
    <section className="login">
      <div className="login-form">
        <div>
          <h2>User Login</h2>
        </div>

        <form  id= "user-login-form">
          {/* Labels and inputs for form data */}
          <div className="form-container">
            <label className="register-label">Email</label>
            <input className="register-input"
              onChange={(e) => setUserEmail(e.target.value)}
              value={email}
              type="email"
              autoComplete="on"
              required
            />
            <label className="register-label">Password</label>
            <input className="register-input"
              onChange={(e) => setUserPassword(e.target.value)}
              value={password}
              autoComplete="on"
              type="password"
              required />
          </div>
          {/* <div>
 
        </div> */}
          <div className="row button-container">
            <Link to={`/`}><button className="register-btn">Cancel</button></Link>
            <button onClick={handleLogin} className="register-btn" type="submit">
              Login
            </button>
            <Link to={`/register`}><button className="register-btn">Register</button></Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginForm