import React from 'react';

const { REACT_APP_NAME} = process.env

function AppName() {

    return (
        <div>
               <h2 className="app-name">${REACT_APP_NAME}</h2>
        </div>
    )

}

export default AppName