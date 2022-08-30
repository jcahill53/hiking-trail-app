import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Sylvia Smith","email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:5000/users/register


function RegisterForm() {

  // States for registration
  // const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

 console.log(`Email ${userEmail}`);
 console.log(`Password ${userPassword}`);

 // Handle the login on submit
 const handleSubmit = async (event) => {
   event.preventDefault();

   const data = new FormData();
   data.append("name", userName);
   data.append("email", userEmail);
   data.append("password", userPassword);

   for (const pair of data.entries()) {
     console.log(`${pair[0]}, ${pair[1]}, ${pair[2]}`);
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
    <section className="register">
      <div className="register-form">
        <div>
          <h2>User Registration</h2>
        </div>


        <form>
          {/* Labels and inputs for form data */}
 
          <div className="form-container">
          <label className="register-label">Name</label>
              <input className="register-input"
                onChange={(e) => setUserName(e.target.value)}
                value={userEmail}
                type="text"
                autoComplete="on"
                required
              />
              <label className="register-label">Email</label>
              <input className="register-input"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                type="email"
                autoComplete="on"
                required
              />
              <label className="register-label">Password</label>
              <input className="register-input"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
                autoComplete="on"
                type="password"
                required />
            </div>
 
          <div className="row button-container">
            <Link to={`/`}><button className="register-btn">Cancel</button></Link>
            <button onClick={handleSubmit} className="register-btn" type="submit">
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