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


