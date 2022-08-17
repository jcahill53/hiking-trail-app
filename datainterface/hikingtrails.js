const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority`



const client = new MongoClient(uri);

const databaseName = 'hiking_db';
const hikesCollName = 'Hikes';
const commCollName = 'Comments';
const usersCollName = 'Users';

module.exports = {}

// GET ALL COMMENTS

// module.exports.getAll = async () => {
//     const database = client.db(databaseName);
//     const comments = database.collection(commCollName);
  
//     const query = {};
//     let commentsCursor = await comments.find(query);
  
//     return commentsCursor.toArray();
//   }