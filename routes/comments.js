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
// curl -sS http://localhost:5000/comments/630e32a920214d9fcc411d74
router.get("/:id", async (req, res) => {
  let comment = await commentData.getCommentById(req.params.id)

  if (comment) {
      res.status(200).send(comment)
  } else {
      res.status(404).send({ error: `no item found with comment id ${req.params.id}` });
  }

});

// UPDATE A COMMENT
  


// DELETE A COMMENT




module.exports = router;