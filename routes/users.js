const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

=
const userData = require('../datainterface/users.jsx');


// GET ALL USERS
// curl -sS http://localhost:8000/users/
router.get("/", async (req, res, next) => {
    let userList = await userData.getAll()
  
    if (userList) {
      res.status(200).send(userList)
    } else {
      // If userList is empty/null, something serious is wrong with the MongoDB connection.
      res.status(500).send({
        error: "Something went wrong. Please try again."
      })
    }
  });
  
//GET USERS BY EMAIL CREDENTIAL

// curl -X POST -H "Content-Type: application/json" -d '{"name":"Sylvia Smith","email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:8000/users/login
// curl -X POST -H "Content-Type: application/json" -d '{"email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:8000/users/login
router.post("/login", async (req, res, next) => {

  let resultStatus;

  let result = await userData.findByCredentials(req.body)

  if(result.error){
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);

});
// REGISTER A USER
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Arthur Rodrigues","email":"arodrig41@gmail.com","password":"Password123!"}' http://localhost:8000/users/register
router.post("/register", async (req, res, next) => {
  let resultStatus;

  let result = await userData.create(req.body)

  if(result.error){
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;