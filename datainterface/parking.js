const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority`



const client = new MongoClient(uri);

const databaseName = 'hiking_db';
const parkingCollName = 'Parking';


module.exports = {}

// GET ALL PARKING DATA

module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const parking = database.collection(parkingCollName);
  
    const query = {};
    let parkingCursor = await parking.find(query);
  
    return parkingCursor.toArray();
  }