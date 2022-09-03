import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';

function NavBar() {

    return (
        <>

            <nav>

                <section className="row">
                    <ul className="nav-links row">
                        <li className="nav-li" ><Link to="/">Return to Welcome Page</Link></li>
                        <li className="nav-li" ><Link to="/hikingtrails">Search Trails</Link></li>
                        <li className="nav-li" ><Link to="/hikingtrails/63002e1b9ed6cb63e334474a">Trail Details</Link></li>
                        <li className="nav-li" ><Link to="/hikingtrails/63002e1b9ed6cb63e334474a/comments">Create a Comment</Link></li>

                    </ul>
                    <Logout />
                </section>

            </nav>

        </>
    )
}

export default NavBar