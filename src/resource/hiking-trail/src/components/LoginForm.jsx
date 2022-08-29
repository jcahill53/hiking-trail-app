import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  // States for login
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  console.log(`Email ${email}`);
  console.log(`Password ${password}`);

  // Handle the login on submit
  const handleLogin = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
 
    // process the login
    fetch('http://localhost:5000/users/login', {
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
      <section className="login">
        <div className="login-form">
          <div>
            <h2>User Login</h2>
          </div>

          <form >
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
          <button className="login-btn" type="submit">Submit</button>
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