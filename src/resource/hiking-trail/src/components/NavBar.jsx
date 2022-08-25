import React from 'react';
import { Link  } from 'react-router-dom';
function NavBar() {

    return (
        <>

            <nav>
                
                <section className="row">
                <ul className="nav-links row">
                    <li className="nav-li" ><Link to="/">Return to Welcome Page</Link></li>
                    <li className="nav-li" ><Link to="/hikingtrails">Search Trails</Link></li>
                    <li className="nav-li" ><Link to="/hikingtrails/:id">Trail Details</Link></li>
                    <li className="nav-li" ><Link to="/hikingtrails/:id/comments">Create a Comment</Link></li>
                  
                </ul>
                </section>
            </nav>

        </>
    )
}

export default NavBar