const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://d-team:Test12@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

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

// ***GET ALL COMMENTS FOR A TRAIL
module.exports.getCommentsByTrailId = async (trailId) => {
  const database = client.db(databaseName);
  const comments = database.collection(collName);

  const query = {trail_id: ObjectId(trailId) };
  let commentsCursor = await comments.findAll(query);
  if (commentsCursor) {
    return commentsCursor.toArray();
  } 
    return { error: "Something went wrong. Please try again." }
  
}

// GET ALL COMMENTS FOR A USER
// module.exports.getCommentsByUserId = async (userId) => {
//   const database = client.db(databaseName);
//   const comments = database.collection(collName);

//   const query = {user_id: ObjectId(userId) };
//   let commentsCursor = await comments.findAll(query);
//   if (commentsCursor) {
//     return commentsCursor.toArray();
//   } 
//     return { error: "Something went wrong. Please try again." }
  
// }

// GET ALL COMMENTS FOR A TRAIL AND USER
// module.exports.getByTrailandUserId = async (trailId,userId) => {
//   const database = client.db(databaseName);
//   const comments = database.collection(collName);

//   const query = {trail_id: ObjectId(trailId), user_id: ObjectId(userId) };
//   let commentsCursor = await comments.find(query) ;
//   if (commentsCursor) {
//     return commentsCursor.toArray();
//   } 
//     return { error: "Something went wrong. Please try again." }
  
// }

// // CREATE A NEW COMMENT
// module.exports.create = async (newObj) => {
//   const database = client.db(databaseName);
//   const comments = database.collection(commCollName);

//   if (!newObj.text) {
//     // Invalid comment object, shouldn't go in database.
//     return { error: "Comment must have a text comment." }
//   }
//   const result = await comments.insertOne(newObj);

//   if (result.acknowledged) {
//     return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
//   } 
//     return { error: "Something went wrong. Please try again." }
  
// }
