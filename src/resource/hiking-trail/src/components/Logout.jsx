import React from 'react';

function Logout() {

    const handleLogin = async (event) => {
        event.preventDefault();
        localStorage.removeItem("authenticated", false);
        localStorage.removeItem("loginData", `Please login`);
    }
    return (
            // <div className="row button-container">
                <button onClick={handleLogin} className="logout-btn" type="submit">
                    Logout
                </button>

            // </div>
    )

}

export default Logout