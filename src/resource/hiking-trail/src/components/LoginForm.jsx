import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
    // States for registration
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
              value={email } type="text" />


            <label className="register-label">Password</label>
            <input className="register-input"
              value={ password} type="password" />
          </div>
          {/* <div>
          <button className="login-btn" type="submit">Submit</button>
        </div> */}
          <div className="row button-container">
            <Link to={`/`}><button className="register-btn">Cancel</button></Link>
            <button className="register-btn" type="submit">
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