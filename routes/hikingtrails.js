const {Router, response} = require("express");
const router = Router();
const corsOptions = {origin: "http://localhost:3000"};

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const trailsData = require('../datainterface/hikingtrails.js');
 

// HIKING TRAIL ENDPOINTS

// #2 GET ALL TRAILS valid
// curl -sS http://localhost:8000/hikingtrails
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

// #4 GET TRAILS BY TRAIL ID valid
// curl -sS http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74


router.get("/:id", async (req, res, next) => {
  const result = await trailsData.getTrailById(req.params.id)
  if (result.error) {
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});

// #55 FIND HIKING TRAILS BY SEARCHING ON NAME valid
// curl -sS "http://localhost:8000/hikingtrails/name/Loop"
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

// CREATE A TRAIL valid
// curl -sS -X POST -H "Content-Type: application/json" -d '{"guideId":"442c890d-7b66-44e6-b646-2c8ff3b207e1","name":"Three Sisters Ridge","urls":{"absoluteSource":"","trailStart":"","trailEnd":""},"measures":{"difficulty":"Moderate","distance":{"value":"8.1","measure":"miles"},"elevationGain":{"value":"560","measure":"feet"}},"updatedAt":"2016-11-27T00:45:39.485Z","locations":{"latitude":"45.55","longitude":"-122.86792"},"descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"}' http://localhost:8000/hikingtrails
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

// UPDATE A TRAIL valid
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"name":"Mount Shasta Loop", "descr":"Hike through beautiful Mount Shasta.  Enjoy spectacular sunset views from the ridge."}' http://localhost:8000/hikingtrails/6313231d2e26bd0f772d7f65

router.put("/:id", async (req, res, next) => {  
let resultStatus;
 
  try
  {
    const result = await trailsData.updateTrailById(req.params.id, req.body)
 
    if(result.error){
      resultStatus = 404;
    } else {
      resultStatus = 200;
    }
    res.status(resultStatus).send(result);
  }
  catch (error)
  {
    resultStatus = 500;
    res.status(resultStatus).send({error: "Something went wrong. Please try again!"});
  }
  
});


// DELETE A TRAIL 
// curl -sS -X DELETE http://localhost:8000/hikingtrails/631a3277fd2a43ad17018786
router.delete("/:id", async (req, res, next) => {
  const result = await trailsData.deleteTrailById(req.params.id);

  if (result.error) {
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});

// COMMENTS ENDPOINTS

//#12 GET ALL COMMENTS FOR A TRAIL valid
// curl -sS http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/comments
router.get("/:id/comments", async (req, res) => {
  let resultStatus;
  const comment = await trailsData.getCommentsByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }
  res.status(resultStatus).send(result);
})

// GET COMMENTS FOR A SPECIFIC TRAIL ID
//curl -sS http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/comments/630e38064123aad9416bd843
router.get("/:id/comments/:commentId", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.getCommentbyCommentId(req.params.commentId)
  // console.log(result);
  if(result.error){
    resultStatus = 500;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});



//#16 CREATE A NEW COMMENT FOR A TRAIL valid
// curl -sS -X POST -H "Content-Type: application/json" -d '{"userId": "630e6f5376fee74a15fbb7fe","messageBody": "I enjoyed this trail - very easy.  Parking was almost full.", "createDayTime": "08/22/2022", "updatedDayTime": "08/22/2022"}' http://localhost:8000/hikingtrails/63129a951a9b8abfde9dca27/comments


router.post("/:id/comments", async (req, res) => {
  let resultStatus;
  const result = await trailsData.createComment(req.params.id, req.body)
  if (result) {
    res.status(200).send(result);
  } else {
    resultStatus = 400;
  }

})


// UPDATE A COMMENT TEXT
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Parking was very full when I first arrived but was overflowing when I finished at 2pm."}' http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/comments/630e38064123aad9416bd843

router.put("/:id/comments/:commentId", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.updateCommentById(req.params.commentId, req.body)

  if(result){
    resultStatus = 200;
  } else {
    resultStatus = 400;
  }

  res.status(resultStatus).send(result);
});



// #11 DELETE A COMMENT FOR A TRAIL valid
// curl -sS -X DELETE http://localhost:8000/hikingtrails/63129a951a9b8abfde9dca27/comments/631a58ff676adae575ecf764

router.delete("/:trailId/comments/:commentId", async (req, res) => {
  let resultStatus;
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

//#54 GET ALL PARKING FOR A TRAIL valid
// curl -sS http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking
router.get("/:id/parking", async (req, res) => {
  let resultStatus;
  const comment = await trailsData.getParkingByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }

})

// GET PARKING FOR A SPECIFIC PARKING ID
// curl -sS http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking/630e38a34123aad9416bd844

router.get("/:trailId/parking/:parkingId", async (req, res, next) => {
  let resultStatus;
  const result = await trailsData.getParkingbyId(req.params.parkingId)
  console.log(result);
  if(result.error){
    resultStatus = 500;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});


//#56 CREATE A NEW PARKING AREA FOR A TRAIL valid
// curl -sS -X POST -H "Content-Type: application/json" -d '{"name": "parking lot 2", "trailId": ["63143027ada3e59710fd18a9"],"emptiestDayTime": "Monday 10:00am","fullest_day_time": "Sunday 12:00pm","parkingLotStatus": "Partially Full","type": "Permit Required", "usersThere": 23}' http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking
router.post("/:id/parking", async (req, res) => {
  let resultStatus;
  const result = await trailsData.createParking(req.params.id, req.body)
  if (result) {
    res.status(200).send(result);
  } else {
    resultStatus = 400;
  }

})

 

// UPDATE PARKING FOR A TRAIL
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"parkingLotStatus":"Empty"}' http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking/63144e31a56fc298c0841af6
router.put("/:trailId/parking/:parkingId", async (req, res, next) => {  
  let resultStatus;
   
    try
    {
      const result = await trailsData.updateParkingById(req.params.parkingId, req.body)
   
      if(result.error){
        resultStatus = 404;
      } else {
        resultStatus = 200;
      }
      res.status(resultStatus).send(result);
    }
    catch (error)
    {
      resultStatus = 500;
      res.status(resultStatus).send({error: "Something went wrong. Please try again!"});
    }
    
  });
 
//  DELETE PARKING  FOR A TRAIL
// curl -sS -X DELETE http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking/631a5ae3676adae575ecf765

router.delete("/:trailId/parking/:parkingId", async (req, res) => {
  let resultStatus;
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