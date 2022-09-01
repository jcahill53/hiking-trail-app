import React from 'react';

import PropTypes from 'prop-types'


function TrailComments(comment, _id) {

    return (
        <div>
            <h1>User Says:</h1>
            <h2> {comment.messageBody}</h2>

        </div>
    )

}

TrailComments.propTypes = {
    comment: PropTypes.object.isRequired,
    _id: PropTypes.string,

}
export default TrailComments