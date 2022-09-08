const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const parkingData = require('../dataInterface/parking.js');

// GET ALL parking
// curl -sS http://localhost:8000/parking
router.get("/", async (req, res, next) => {
  let parkingList = await parkingData.getAll()

  if(parkingList){
    res.status(200).send(parkingList)
  } else {
    // If parkingList is empty/null, something serious is wrong with the MongoDB connection.
    res.status(500).send({error: "Something went wrong. Please try again."})
  }
});

module.exports = router;