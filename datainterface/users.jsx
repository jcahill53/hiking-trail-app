const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://d-team:Test12@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const databaseName = 'hiking_db';
const usersCollName = 'users';

module.exports = {}



module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const users = database.collection(usersCollName);
  
    const query = {};
    let usersCursor = await users.find(query).limit(100);
    if(usersCursor){
      return usersCursor.toArray();
    }
    
  }