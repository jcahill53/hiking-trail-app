const { Router } = require("express");
const router = Router();

router.use("/hikingtrails", require("./hikingtrails"));
router.use("/", (req, res) => res.status(404).send("Route not found. Maybe you meant /hikingtrails"))
module.exports = router;
