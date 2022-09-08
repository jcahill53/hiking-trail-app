import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function FailRegistration({errorMsg}) {
    return (
        <section className="register" >
          <div className="register-form">
            <div>
              <h2>{errorMsg}</h2>
            </div>     
              <div className="row button-container">
              <Link to={`/login`}><button className="register-btn">Login</button></Link>
              </div>
          </div>
        </section>
      );

}

