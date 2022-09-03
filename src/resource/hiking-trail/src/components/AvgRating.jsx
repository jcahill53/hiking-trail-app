import React from 'react';

const databaseName = 'hiking_db'; 

module.exports = {}

function Footer() {
// aggregation for a trail - average trail rating
const avgTrailRating = databaseName.comments.aggregate(
    [
      {
        $group:
          {
            _id: "$trailId",
            avgAmount: { $avg: "$rateTrail" } },

      }
    ]
 )
 console.log(avgTrailRating)
 return (
    <div>
        <footer>
            <p> </p>
        </footer>
    </div>
)

}

export default Footer