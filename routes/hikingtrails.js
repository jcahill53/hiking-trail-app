const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const commentData = require('../dataInterface/hikingtrails.js');

// // GET ALL comments
// // curl -sS http://localhost:5000/comments
// router.get("/", async (req, res, next) => {
//   let commentList = await commentData.getAll()

//   if(commentList){
//     res.status(200).send(commentList)
//   } else {
//     // If movieList is empty/null, something serious is wrong with the MongoDB connection.
//     res.status(500).send({error: "Something went wrong. Please try again."})
//   }
// });


module.exports = router;