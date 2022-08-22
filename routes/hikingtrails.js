const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const trailsData = require('../datainterface/hikingtrails.js');

// HIKING TRAIL ENDPOINTS

// #2 GET ALL TRAILS
// curl -sS http://localhost:5000/hikingtrails
router.get("/", async (req, res, next) => {
    let trailsList = await trailsData.getAll()
  
    if(trailsList){
      res.status(200).send(trailsList)
    } else {
      // If trailsList is empty/null, something serious is wrong with the MongoDB connection.
      res.status(500).send({error: "Something went wrong. Please try again."})
    }
  });

  // #4 GET TRAILS BY TRAIL ID
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a
// curl -sS http://localhost:5000/hikingtrails/6301bd4862a5d14a1a780e35

router.get("/:id", async (req, res, next) => {
  const result = await trailsData.getTrailById(req.params.id)
console.log(result);
  if(result.error){
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});

// #55 FIND HIKING TRAILS BY SEARCHING ON NAME
// curl -sS "http://localhost:5000/hikingtrails/name/Rooster%20Rock%20Loop%20Hike"
router.get("/name/:name", async (req, res, next) => {
  const result = await trailsData.getTrailsByName(req.params.name);

  if (result) {
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({error: `No hike found for ${req.params.name} trail`});
    }
  } else {
    res.status(500).send({error:"Something went wrong. Please try again."})
  }
});

// COMMENTS FOR A TRAIL ENDPOINTS

  //#12 GET ALL COMMENTS FOR A TRAIL
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
router.get("/:id/comments", async(req, res) => {
  const comment = await trailsData.getCommentsByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }
  
})

//#16 CREATE A NEW COMMENT FOR A TRAIL
// curl -sS -X POST -H "Content-Type: application/json" -d '{"userId": "63002e7ef11bb0d6dee7272d","messageBody": "I enjoyed this trail2.  Parking was almost full.", "createDayTime": "07/12/2022", "updatedDayTime": "07/12/2022"}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
router.post("/:id/comments", async(req, res) => {
  const result = await trailsData.createComment(req.params.id, req.body)
  if(result){
    res.status(200).send(result);
  } 
  else {
    resultStatus = 400;
  }
  
})

// #11 DELETE A COMMENT FOR A TRAIL
// curl -sS -X DELETE http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments/6302c35ce2041c3eab2e83d9
router.delete("/:trailId/comments/:commentId", async(req, res)=>{
  const result = await trailsData.deleteCommentById(req.params.commentId)
  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }
  console.log(resultStatus);
  res.status(resultStatus).send(result);

})

//jmc note:  update is not working yet 
// UPDATE A COMMENT TEXT
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Not one of my favorite trails."}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments/63025c449df58d8c409a4828
// router.put("/:trailId/comments/:commentId", async (req, res, next) => {
//   let resultStatus;
//   const result = await trailsData.updateCommentById(req.params.commentId, req.body)

//   if(result){
//     resultStatus = 200;
//   } else {
//     resultStatus = 400;
//   }

//   res.status(resultStatus).send(result);
// });




// PARKING ENDPOINTS FOR A TRAIL

  //#54 GET ALL PARKING FOR A TRAIL
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/parking
router.get("/:id/parking", async(req, res) => {
  const comment = await trailsData.getParkingByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }
  
})

//#56 CREATE A NEW PARKING AREA FOR A TRAIL
// curl -sS -X POST -H "Content-Type: application/json" -d '{"name": "parking lot 2", "trailId": ["63002e1b9ed6cb63e334474e","63002e1b9ed6cb63e334474d"],"emptiestDayTime": "Monday 12:00pm","fullest_day_time": "Saturday 2:00pm","parkingLotStatus": "full"}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/parking
router.post("/:id/parking", async(req, res) => {
  const result = await trailsData.createParking(req.params.id, req.body)
  if(result){
    res.status(200).send(result);
  } 
  else {
    resultStatus = 400;
  }
  
})



module.exports = router;