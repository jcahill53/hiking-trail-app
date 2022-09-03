const {
  Router,
  response
} = require("express");
const router = Router();
const corsOptions = {
  origin: "http://localhost:3000"
};

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

const trailsData = require('../datainterface/hikingtrails.js');
const commentData = require('../datainterface/comments.js');
const parkingData = require('../datainterface/parking.js');

// HIKING TRAIL ENDPOINTS

// #2 GET ALL TRAILS
// curl -sS http://localhost:5000/hikingtrails
router.get("/", async (req, res, next) => {
  let trailsList = await trailsData.getAll()

  if (trailsList) {
    res.status(200).send(trailsList)
  } else {
    // If trailsList is empty/null, something serious is wrong with the MongoDB connection.
    res.status(500).send({
      error: "Something went wrong. Please try again."
    })
  }
});

// #4 GET TRAILS BY TRAIL ID
// curl -sS http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74


router.get("/:id", async (req, res, next) => {
  const result = await trailsData.getTrailById(req.params.id)
  if (result.error) {
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});

// #55 FIND HIKING TRAILS BY SEARCHING ON NAME
// curl -sS "http://localhost:5000/hikingtrails/name/Loop"
// curl -sS "http://localhost:5000/hikingtrails/name/Hike"
router.get("/name/:name", async (req, res, next) => {
  const result = await trailsData.getTrailsByName(req.params.name);

  if (result) {
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({
        error: `No hike found for ${req.params.name} trail`
      });
    }
  } else {
    res.status(500).send({
      error: "Something went wrong. Please try again."
    })
  }
});

// CREATE A TRAIL
// curl -sS -X POST -H "Content-Type: application/json" -d '{"name":"Mount Hood Hike Loop"}' http://localhost:5000/hikingtrails
// curl -sS -X POST -H "Content-Type: application/json" -d '{"guideId":"442c890d-7b66-44e6-b646-2c8ff3b207e1","name":"Rock Creek Greenway Hike","urls":{"absoluteSource":"","trailStart":"","trailEnd":""},"measures":{"difficulty":"Moderate","distance":{"value":"8.1","measure":"miles"},"elevationGain":{"value":"560","measure":"feet"}},"updatedAt":"2016-11-27T00:45:39.485Z","locations":{"latitude":"45.55","longitude":"-122.86792"},"descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"}' http://localhost:5000/hikingtrails

router.post("/", async (req, res, next) => {
  let resultStatus;
  let result = await trailsData.create(req.body);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// UPDATE A TRAIL
// ***************
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"name":"Mount Hood Ridge Loop", "descr":"Hike through beautiful Mount Hood.  Enjoy spectacular views from the ridge."}' http://localhost:5000/hikingtrails/6313231d2e26bd0f772d7f65
router.put("/:id", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.updateTrailById(req.params.id, req.body)

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// DELETE A TRAIL 
// ***************
// curl -sS -X DELETE http://localhost:5000/hikingtrails/63129a0d1a9b8abfde9dca26
router.delete("/:id", async (req, res, next) => {
  const result = await trailsData.deleteById(req.params.id);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});

// COMMENTS FOR A TRAIL ENDPOINTS

//#12 GET ALL COMMENTS FOR A TRAIL
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
// curl -sS http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/comments
router.get("/:id/comments", async (req, res) => {
  const comment = await trailsData.getCommentsByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }

})

//#16 CREATE A NEW COMMENT FOR A TRAIL
// curl -sS -X POST -H "Content-Type: application/json" -d '{"userId": "630e6f5376fee74a15fbb7fe","messageBody": "I enjoyed this trail - very easy.  Parking was almost full.", "createDayTime": "08/22/2022", "updatedDayTime": "08/22/2022"}' http://localhost:5000/hikingtrails/63129a951a9b8abfde9dca27/comments


router.post("/:id/comments", async (req, res) => {
  const result = await trailsData.createComment(req.params.id, req.body)
  if (result) {
    res.status(200).send(result);
  } else {
    resultStatus = 400;
  }

})


// **********
// UPDATE A COMMENT TEXT
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"text":"Not favorite movie!"}' http://localhost:5001/movies/573a1391f29313caabcd9688/comments/5a9427648b0beebeb6957d04
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Parking was overflowing when I finished my hike.  Another car was blocking my car!"}' http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/comments/630e70f476fee74a15fbb801
router.put("/:trailId/comments/:commentId", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.updateCommentById(req.params.commentId, req.body)

  if(result){
    resultStatus = 200;
  } else {
    resultStatus = 400;
  }

  res.status(resultStatus).send(result);
});

// #11 DELETE A COMMENT FOR A TRAIL
// curl -sS -X DELETE http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/comments/630e70f476fee74a15fbb801

router.delete("/:trailId/comments/:commentId", async (req, res) => {
  const result = await trailsData.deleteCommentById(req.params.commentId)
  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }
  console.log(resultStatus);
  res.status(resultStatus).send(result);

});


// PARKING ENDPOINTS FOR A TRAIL

//#54 GET ALL PARKING FOR A TRAIL
// curl -sS http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/parking
router.get("/:id/parking", async (req, res) => {
  const comment = await trailsData.getParkingByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }

})

//#56 CREATE A NEW PARKING AREA FOR A TRAIL
// curl -sS -X POST -H "Content-Type: application/json" -d '{"name": "parking lot 2", "trailId": ["63129a0d1a9b8abfde9dca26"],"emptiestDayTime": "Monday 10:00am","fullest_day_time": "Sunday 12:00pm","parkingLotStatus": "Partially Full","type": "Permit Required", "usersThere": 5}' http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/parking
router.post("/:id/parking", async (req, res) => {
  const result = await trailsData.createParking(req.params.id, req.body)
  if (result) {
    res.status(200).send(result);
  } else {
    resultStatus = 400;
  }

})

// **********
// UPDATE A PARKING TEXT
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"text":"Not favorite movie!"}' http://localhost:5001/movies/573a1391f29313caabcd9688/comments/5a9427648b0beebeb6957d04
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Parking was overflowing when I finished my hike.  Another car was blocking my car!"}' http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/parking/630e70f476fee74a15fbb801
router.put("/:trailId/comments/:commentId", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.updateCommentById(req.params.commentId, req.body)

  if(result){
    resultStatus = 200;
  } else {
    resultStatus = 400;
  }

  res.status(resultStatus).send(result);
});

// ****************
//  DELETE PARKING  FOR A TRAIL
// curl -sS -X DELETE http://localhost:5000/hikingtrails/630e32a920214d9fcc411d74/parking/631339952e26bd0f772d7f67

router.delete("/:trailId/parking/:parkingId", async (req, res) => {
  const result = await trailsData.deleteParkingById(req.params.parkingId)
  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }
  console.log(resultStatus);
  res.status(resultStatus).send(result);

});

module.exports = router;