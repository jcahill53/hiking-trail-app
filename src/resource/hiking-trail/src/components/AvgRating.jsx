const databaseName = 'hiking_db'; 

module.exports = {}

function AvgRating() {
// aggregation for a trail - average trail rating
const avgTrailRating = databaseName.comments.aggregate(
  [
    {
      '$match': {
        'rateTrail': {
          '$exists': 1, 
          '$ne': ''
        }
      }
    }, {
      '$group': {
        '_id': '$trailId', 
        'avgTrailRating': {
          '$avg': '$rateTrail'
        }
      }
    }
  ]
  
)

console.log(avgTrailRating)
}



export default AvgRating