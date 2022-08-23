const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
`mongodb+srv://d-team:Test12@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

const databaseName = 'hiking_db';
const trailsCollName = 'trails';
const commCollName = 'comments';
const parkingCollName = 'parking';

module.exports = {}

// HIKING TRAIL ENDPOINTS

// #2 GET ALL HIKING TRAIL DATA
module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const trails = database.collection(trailsCollName);
  
    const query = {};
    let trailsCursor = await trails.find(query).limit(100);
    if(trailsCursor){
      return trailsCursor.toArray();
    } 
    
  }

  // #4 GET TRAILS BY ID
module.exports.getTrailById = async (trailId) => {
  const database = client.db(databaseName);
  const trails = database.collection(trailsCollName);

  const query = { _id: ObjectId(trailId) };
  let trail = await trails.findOne(query);

  return trail;
}

// #55 FIND HIKING TRAILS BY SEARCHING ON NAME
module.exports.getTrailsByName = async (name) => {
  const database = client.db(databaseName);
  const trails = database.collection(trailsCollName);

  // const query = {name:{'$regex' : '^name$', '$options' : 'i'}};
  const query = {name: name};
  let trailsCursor = await trails.find(query);

  return trailsCursor.toArray();
}

// COMMENTS FOR A TRAIL ENDPOINT

  // #12 GET ALL COMMENTS FOR A TRAIL
module.exports.getCommentsByTrailId = async (trailId) => {
  const database = client.db(databaseName);
  const comments = database.collection(commCollName);

  const query = { trailId: ObjectId(trailId) };

  let commentCursor = await comments.find(query);
  return commentCursor.toArray();
}

  
// #16 CREATE A NEW COMMENT
module.exports.createComment = async (trailId, newObj) => {

  const database = client.db(databaseName);
  const comments = database.collection(commCollName);
  const validTrail = await module.exports.getTrailById(trailId);
  const goodObj = { ...newObj, trailId: ObjectId(trailId), date: new Date() }

  const result = await comments.insertOne(goodObj);
 
  if(!validTrail) {
    return {error:  `The trail id provided is not a valid trail id. `}
  } else {
  if(goodObj){
    return { newObjectId: result.insertedId, message: `Comment created! ID: ${result.insertedId}` }
  } else {
    return {error: "Something went wrong. Please try again."}
  }
  }

}

// #11 DELETE A COMMENT BY ID
module.exports.deleteCommentById = async (commentId) => {
  const database = client.db(databaseName);
  const comments = database.collection(commCollName)

  const deletionRules = { _id: ObjectId(commentId) }
  const result = await comments.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return { error: `Something went wrong. Please try again.` }
  };

  return { message: `Deleted ${result.deletedCount} comment.` };
}

//jmc note:  update is not working yet 
// UPDATE A COMMENT BY ID
// module.exports.updateCommentById = async (commentId, newObj) => {
//   const database = client.db(databaseName);
//   const comments = database.collection(commCollName)

//   const updateRules = {
//     $set: { "messageBody": newObj.messageBody }
//   };
//   const filter = { _id: ObjectId(commentId) };
//   const result = await comments.updateOne(filter, updateRules);

//   if (result.modifiedCount != 1) {
//     return { error: `Something went wrong. Please try again.` }
//   };
//   return {message: `${result.modifiedCount} comments has been updated`}
// }

// PARKING FOR A TRAIL ENDPOINT

   // #54 GET ALL PARKING FOR A TRAIL
   module.exports.getParkingByTrailId = async (trailId) => {
    const database = client.db(databaseName);
    const parking = database.collection(parkingCollName);
  
    const query = { trailId: ObjectId(trailId) };
  
    let parkingCursor = await parking.find(query);
    return parkingCursor.toArray();
  }

  // #56 CREATE A NEW PARKING AREA FOR A TRAIL
module.exports.createParking = async (trailId, newObj) => {

  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName);
  const validTrail = await module.exports.getTrailById(trailId);
  const goodObj = { ...newObj, trailId: ObjectId(trailId), date: new Date() }

  const result = await parking.insertOne(goodObj);

  console.log(ObjectId(trailId));
  
  if(!validTrail) {
    return {error:  `The trail id provided is not a valid trail id. `}
  } else {
  if(goodObj){
    return { newObjectId: result.insertedId, message: `Parking created! ID: ${result.insertedId}` }
  } else {
    return {error: "Something went wrong. Please try again."}
  }
  }

}