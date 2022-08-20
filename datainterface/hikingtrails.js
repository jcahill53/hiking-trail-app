const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jymhgca.mongodb.net/?retryWrites=true&w=majority`



const client = new MongoClient(uri);

const databaseName = 'hiking_db';
const hikesCollName = 'Hikes';



