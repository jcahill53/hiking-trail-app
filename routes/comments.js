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
// curl -sS http://localhost:5000/comments/630033e6d869e7133ea861e8
// curl -sS http://localhost:5000/comments/6301c0c15da14ea19ee0caab
router.get("/:id", async (req, res) => {
  let comment = await commentData.getCommentById(req.params.id)

  if (comment) {
      res.status(200).send(comment)
  } else {
      res.status(404).send({ error: `no item found with comment id ${req.params.id}` });
  }

});


//GET ALL COMMENTS FOR A USER
// curl -sS http://localhost:5000/Users/#####/comments

// router.get("/users/:id/comments", async(req, res) => {
//   const comment = await commentData.getCommentsByUserId(req.params.id)
//   if (comment) {
//     res.status(200).send(result);
//   } else {
//     resultStatus = 404;
//   }
  
// })

//GET ALL COMMENTS FOR A TRAIL AND USER
// curl -sS http://localhost:5000/Trails/#####/comments
// router.get("/users/:id/comments", async(req, res) => {
//   const comment = await commentData.getCommentsByUserId(req.params.id)
//   if (comment) {
//     res.status(200).send(result);
//   } else {
//     resultStatus = 404;
//   }
  
// })
  
 
module.exports = router;