const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

// const uri =
// `mongodb+srv://d-team:Test12@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority`

const uri =
`mongodb+srv://d-team:Test12@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority`


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const databaseName = 'hiking_db';
const commCollName = 'comments';


module.exports = {}

// #14  GET ALL COMMENTS
module.exports.getAllComments = async () => {
  const database = client.db(databaseName);
  const comments = database.collection(commCollName);

  const query = {};
  let commentsCursor = await comments.find(query);

  return commentsCursor.toArray();
}

// #15 GET A SINGLE COMMENT BY COMMENT ID
module.exports.getCommentById = async (commentId) => {
  const database = client.db(databaseName);
  const comments = database.collection(commCollName);

  const query = { _id: ObjectId(commentId) };
  let comment = await comments.findOne(query);

  return comment;
}



