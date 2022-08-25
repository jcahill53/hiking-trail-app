import React, { useState } from 'react';
 
function RegisterForm() {
 
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
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
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="register-label">Name</label>
        <input onChange={handleName} className="register-input"
          value={name} type="text" />
 
        <label className="register-label">Email</label>
        <input onChange={handleEmail} className="register-input"
          value={email} type="email" />
 
        <label className="register-label">Password</label>
        <input onChange={handlePassword} className="register-input"
          value={password} type="password" />
 
        <button onClick={handleSubmit} className="register-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
    </section>
  );
}

export default RegisterForm