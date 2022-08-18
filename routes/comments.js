const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const commentData = require('../dataInterface/comments.js');

// GET ALL COMMENTS
// curl -sS http://localhost:5000/comments
router.get("/", async (req, res, next) => {
  let commentList = await commentData.getAllComments()

  if(commentList){
    res.status(200).send(commentList)
  } else {
    // If commentList is empty/null, something serious is wrong with the MongoDB connection.
    res.status(500).send({error: "Something went wrong. Please try again."})
  }
});

// GET A SINGLE COMMENT BY COMMENT ID
// curl -sS http://localhost:5000/comments/####

router.get("/comments/:id", async (req, res) => {
  let comment = await commentData.getCommentById(req.params.id)

  if (comment) {
      res.status(200).send(comment)
  } else {
      res.status(404).send({ error: `no item found with title ${req.params.callLetters}` });
  }

});

//***GET ALL COMMENTS FOR A TRAIL
// curl -sS http://localhost:5000/Trails/#####/comments
router.get("/:id/comments", async(req, res) => {
  const comment = await commentData.getCommentsByTrailId(req.params.id)
  if (comment) {
    res.status(200).send(result);
  } else {
    resultStatus = 404;
  }
  
})

//GET ALL COMMENTS FOR A USER
// curl -sS http://localhost:5000/Trails/#####/comments

router.get("/users/:id/comments", async(req, res) => {
  const comment = await commentData.getCommentsByUserId(req.params.id)
  if (comment) {
    res.status(200).send(result);
  } else {
    resultStatus = 404;
  }
  
})

//GET ALL COMMENTS FOR A TRAIL AND USER
// curl -sS http://localhost:5000/Trails/#####/comments
router.get("/users/:id/comments", async(req, res) => {
  const comment = await commentData.getCommentsByUserId(req.params.id)
  if (comment) {
    res.status(200).send(result);
  } else {
    resultStatus = 404;
  }
  
})


//CREATE A NEW COMMENT
// curl -sS -X POST -H "Content-Type: application/json" -d '{"name":"Cinephile Cyprus", "text":"Wow!"}' http://localhost:5000/trails/####/comments
router.post("/:id/comments", async(req, res) => {
  const result = await movieData.createComment(req.params.id, req.body)
  if(result){
    res.status(200).send(result);
  } 
  else {
    resultStatus = 400;
  } 
})


// UPDATE A COMMENT 
// curl -sS http://localhost:5001/movies/573a1390f29313caabcd446f/comments
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"text":"Not favorite movie!"}' http://localhost:5001/movies/573a1391f29313caabcd9688/comments/5a9427648b0beebeb6957d04
router.put("/:Id/comments/:commentId", async (req, res, next) => {
  let resultStatus;
  const result = await movieData.updateCommentById(req.params.commentId, req.body)

  if(result){
    resultStatus = 200;
  } else {
    resultStatus = 400;
  }

  res.status(resultStatus).send(result);
});
  

// DELETE A TRAIL COMMENT

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