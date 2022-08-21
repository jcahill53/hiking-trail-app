const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const trailsData = require('../datainterface/hikingtrails.js');

// GET ALL TRAILS
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

  // GET TRAILS BY TRAIL ID
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

  //GET ALL COMMENTS FOR A TRAIL
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
router.get("/:id/comments", async(req, res) => {
  const comment = await trailsData.getCommentsByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(comment);
  } else {
    resultStatus = 404;
  }
  
})


//CREATE A NEW COMMENT
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


//jmc note:  update is not working yet 
// UPDATE A COMMENT TEXT
// curl -sS http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Not one of my favorite trails."}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments/63025c449df58d8c409a4828
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



// curl -sS -X DELETE http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments/63026fd2c854e92d1d95ee41
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

module.exports = router;