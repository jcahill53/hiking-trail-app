const { Router, response } = require("express");
const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const userData = require('../dataInterface/users.js');




module.exports = router;