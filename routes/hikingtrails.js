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
// curl -sS -X POST -H "Content-Type: application/json" -d '{"bodyMessage":"Great Trail!"}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments
// curl -sS -X POST -H "Content-Type: application/json" -d '{"messageBody": "I enjoyed this trail.  Parking was almost full.", "createDayTime": "07/12/2022", "updatedDayTime": "07/12/2022"}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments

router.post("/:id/comments", async(req, res) => {
  const result = await trailsData.createComment(req.params.id, req.body)
  if(result){
    res.status(200).send(result);
  } 
  else {
    resultStatus = 400;
  }
  
  
})

//jmc note:  update and delete are not working yet 
// UPDATE A COMMENT 
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"messageBody":"Not favorite movie!"}' http://localhost:5000/hikingtrails/63002e1b9ed6cb63e334474a/comments/6301c3a4a21505ac4795e2f4
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


// UPDATE A TRAIL COMMENT
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"trailId":"", bodyMessage":"How cool was that?"}' http://localhost:5000/hikingtrails/62df1af940ac945c80be005e
// router.put("/:id", async (req, res, next) => {
//   let resultStatus;
//   const result = await movieData.updateById(req.params.id, req.body)

//   if(result.error){
//     resultStatus = 400;
//   } else {
//     resultStatus = 200;
//   }

//   res.status(resultStatus).send(result);
// });

// curl -sS -X DELETE http://localhost:5000/trails/####/comments/####
router.delete("/:trailId/comments/:commentId", async(req, res)=>{
  const result = await commentData.deleteCommentById(req.params.commentId)
  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }
  console.log(resultStatus);
  res.status(resultStatus).send(result);

})

module.exports = router;