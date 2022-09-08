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

// UPDATE PARKING
// curl -sS -X PUT -H "Content-Type: application/json" -d '{"parkingLotStatus":"Full"}' http://localhost:8000/parking/630e38a34123aad9416bd844
router.put("/parking/:id", async (req, res, next) => {
  let resultStatus;
  const result = await parkingData.updateParkingById(req.params.id, req.body)

  if(result.error){
    resultStatus = 400;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

// 6312af4e1a9b8abfde9dca2c
module.exports = router;