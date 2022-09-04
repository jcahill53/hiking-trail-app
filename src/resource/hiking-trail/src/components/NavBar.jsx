import React from 'react';
// import { Link } from 'react-router-dom';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <>

            <nav>
"
                <section className="row button-container">
  
                        <Link to="/"><button className="logout-btn" >Return Home</button></Link> 
                        <Link to="/hikingtrails"><button className="logout-btn" >Search Trails</button></Link> 
                        <Logout />
 
                </section>

            </nav>

        </>
    )
}

export default NavBar