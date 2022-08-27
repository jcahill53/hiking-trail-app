import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Sylvia Smith","email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:5000/users/register


function RegisterForm() {

  // States for registration
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // const url = `http://localhost:5000/users/register?name=${userName}&email=${userEmail}&password=${userPassword}`

  // Handling the name change
  const handleName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setUserEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setUserPassword(e.target.value);
    setSubmitted(false);
  };



  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

      // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {userName} successfully registered!!</h1>
      </div>
    );
  };

  useEffect(() => {

 
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userEmail, userPassword  })
    };
    fetch('http://localhost:5000/users/register', requestOptions)
        .then(response => response.json())
        .then(data => setUserId(data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [userName, userEmail, userPassword]);

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === '' || userEmail === '' || userPassword === '') {
      setError(true);
    } 
    else {
      setSubmitted(true);
      setError(false);
    }
  };

  return (
    <section className="register">
      <div className="register-form">
        <div>
          <h2>User Registration</h2>
        </div>

        {/* Calling to the methods */}
        <div className="register-messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form onClick={handleSubmit}  >
          {/* Labels and inputs for form data */}
          <div className="form-container">
            <label className="register-label">Name</label>
            <input onChange={handleName} className="register-input"
              value={userName} type="text"  autoComplete="off" />

            <label className="register-label">Email</label>
            <input onChange={handleEmail} className="register-input"
              value={userEmail} type="email"  autoComplete="off" />

            <label className="register-label">Password</label>
            <input onChange={handlePassword} className="register-input"
              value={userPassword} type="password"  autoComplete="off" />
          </div>
          <div className="row button-container">
            <Link to={`/`}><button className="register-btn">Cancel</button></Link>
            <button className="register-btn" type="submit">
              Register
            </button>
            <Link to={`/login`}><button className="register-btn">Login</button></Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm