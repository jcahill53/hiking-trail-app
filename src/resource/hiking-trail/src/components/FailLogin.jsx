import React from 'react';
import { Link } from 'react-router-dom';

function FailLogin() {

    return (
        <section className="register">
          <div className="register-form">
            <div>
              <h2>Your login was not successful. Please try again</h2>
            </div>     
              <div className="row button-container">
                <Link to={`/login`}><button className="register-btn">Login</button></Link>
              </div>
          </div>
        </section>
      );

}

export default FailLogin