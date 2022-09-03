const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

// const uri =
// `mongodb+srv://d-team:Test12@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority`

const uri =
`mongodb+srv://d-team:Test12@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const databaseName = 'hiking_db';
const parkingCollName = 'parking';


module.exports = {}

// GET ALL PARKING DATA

module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName);

  const query = {};
  let parkingCursor = await parking.find(query);
  if(parkingCursor){
    return parkingCursor.toArray();
  }
  
}

// UPDATE PARKING

module.exports.updateParkingById = async (newObj, parkingId) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName)

  const updateRules = {
    $set: { "parkingLotStatus": newObj.parkingLotStatus }
  };
  const filter = { _id: ObjectId(parkingId) };
  const result = await parking.updateOne(filter, updateRules);

  if (result.modifiedCount != 1) {
    return { error: `Something went wrong. Please try again.` }
  };
  return {message: `${result.modifiedCount} trail has been updated`}
}

// DELETE PARKING
module.exports.deleteParkingById = async (parkingId) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName)

  const deletionRules = { _id: ObjectId(parkingId) }
  const result = await parking.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return { error: `Something went wrong. Please try again.` }
  };

  return { message: `Deleted ${result.deletedCount} trail.` };
}