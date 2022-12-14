
const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

const uri =
  `mongodb+srv://d-team:Test12@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority`


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
  let trailsCursor = await trails.find(query).limit(50);
  if (trailsCursor) {
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

  const query = { name: { $regex: name, $options: 'i' } }

  let trailsCursor = await trails.find(query).limit(30);

  return trailsCursor.toArray();

}

// CREATE A TRAIL

module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const trails = database.collection(trailsCollName);

  if (!newObj.name) {
    // Invalid movie object, shouldn't go in database.
    return { error: "Trails must have a trail name." }
  }
  const result = await trails.insertOne(newObj);

  if (result.acknowledged) {
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
  } else {
    return { error: "Something went wrong. Please try again." }
  }
}

// UPDATE A TRAIL
module.exports.updateTrailById = async (trailId, newObj) => {
  const database = client.db(databaseName);
  const trails = database.collection(trailsCollName)

  const updateRules = {
    $set: { "descr": newObj.descr }
  };
  const filter = { _id: ObjectId(trailId) };
  const result = await trails.updateOne(filter, updateRules);

  if (result.modifiedCount != 1) {
    return { error: `Something went wrong. ${result.modifiedCount} comments were updated. Please try again.` }
  };
  const updatedTrail = module.exports.getTrailById(trailId);

  return updatedTrail;
}

// DELETE A TRAIL
module.exports.deleteTrailById = async (trailId) => {
  const database = client.db(databaseName);
  const trails = database.collection(trailsCollName)

  const deletionRules = { _id: ObjectId(trailId) }
  const result = await trails.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return { error: `Something went wrong. Please try again.` }
  };

  return { message: `Deleted ${result.deletedCount} trail.` };
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

// GET A COMMENT FOR A SPECIFIC TRAIL AND COMMENT ID

module.exports.getCommentbyCommentId = async (commentId) => {
  const database = client.db(databaseName);
  const commentdata = database.collection(commCollName);

  const query = { _id: ObjectId(commentId) };
  let onecomment = await commentdata.findOne(query);
  return onecomment;
}



// #16 CREATE A NEW COMMENT
module.exports.createComment = async (trailId, newObj) => {

  const database = client.db(databaseName);
  const comments = database.collection(commCollName);
  const validTrail = await module.exports.getTrailById(trailId);
  const goodObj = { ...newObj, trailId: ObjectId(trailId), date: new Date() }

  const result = await comments.insertOne(goodObj);

  if (!validTrail) {
    return { error: `The trail id provided is not a valid trail id. ` }
  } else {
    if (goodObj) {
      return { newObjectId: result.insertedId, message: `Comment created! ID: ${result.insertedId}` }
    } else {
      return { error: "Something went wrong. Please try again." }
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

// UPDATE A COMMENT BY ID

module.exports.updateCommentById = async (commentId, newObj) => {
  const database = client.db(databaseName);
  const comments = database.collection(commCollName)

  const updateRules = {
    $set: { "messageBody": newObj.messageBody }
  };
  const filter = { _id: ObjectId(commentId) };
  const result = await comments.updateOne(filter, updateRules);

  if (result.modifiedCount != 1) {
    return { error: `Something went wrong. ${result.modifiedCount} comments were updated. Please try again.` }
  };


  const updatedComment = module.exports.getCommentbyCommentId(commentId);

  return updatedComment;
}

// DELETE A COMMENT
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

// PARKING FOR A TRAIL ENDPOINT

// #54 GET ALL PARKING FOR A TRAIL
module.exports.getParkingByTrailId = async (trailId) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName);

  const query = { trailId: { $in: [ObjectId(trailId)] } };

  let parkingCursor = await parking.find(query);
  return parkingCursor.toArray();
}

// GET PARKING FOR A SPECIFIC TRAIL AND PARKING ID
module.exports.getParkingbyId = async (parkingId) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName);

  const query = { _id: ObjectId(parkingId) };
  let parkg = await parking.findOne(query);

  return parkg;
}


// #56 CREATE A NEW PARKING AREA FOR A TRAIL
module.exports.createParking = async (trailId, newObj) => {

  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName);
  const validTrail = await module.exports.getTrailById(trailId);
  const goodObj = { ...newObj, trailId: ObjectId(trailId), date: new Date() }

  const result = await parking.insertOne(goodObj);

  if (!validTrail) {
    return { error: `The trail id provided is not a valid trail id. ` }
  } else {
    if (goodObj) {
      return { newObjectId: result.insertedId, message: `Parking created! ID: ${result.insertedId}` }
    } else {
      return { error: "Something went wrong. Please try again." }
    }
  }

}

// UPDATE PARKING BY ID
module.exports.updateParkingById = async (parkingId, newObj) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName)

  const updateRules = {
    $set: { "parkingLotStatus": newObj.parkingLotStatus }
  };
  const filter = { _id: ObjectId(parkingId) };
  const result = await parking.updateOne(filter, updateRules);

  if (result.modifiedCount != 1) {
    return { error: `Something went wrong. ${result.modifiedCount} comments were updated. Please try again.` }
  };
  const updatedParking = module.exports.getParkingbyId(parkingId);

  return updatedParking;
}

// DELETE PARKING FOR A TRAIL
module.exports.deleteParkingById = async (parkingId) => {
  const database = client.db(databaseName);
  const parking = database.collection(parkingCollName)

  const deletionRules = { _id: ObjectId(parkingId) }
  const result = await parking.deleteOne(deletionRules);

  if (result.deletedCount != 1) {
    return { error: `Something went wrong. Please try again.` }
  };

  return { message: `Deleted ${result.deletedCount} parking object.` };
}