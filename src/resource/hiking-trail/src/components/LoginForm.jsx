import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  // States for registration

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // const email = userEmail;
  // const password = userPassword;

  console.log(`Email ${userEmail}`);
  console.log(`Password ${userPassword}`);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`Email ${userEmail}`);
    console.log(`Password ${userPassword}`);

    let result = fetch('http://localhost:5000/users/login', {
     
      method: 'post',
      body: JSON.stringify({ userEmail, userPassword }),
      headers: {
        'Content-Type': 'application.json'
      }

    });
    result = await result.json();


    console.log(result);


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
              value={userEmail}
              type="email"
              autoComplete="off"
              required
            />
            <label className="register-label">Password</label>
            <input className="register-input"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              autoComplete="off"
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