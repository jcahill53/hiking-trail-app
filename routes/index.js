const { Router } = require("express");
const router = Router();

router.use("/comments", require("./comments"));
router.use("/hikingtrails", require("./hikingtrails"));
router.use("/parking", require("./parking"));
router.use("/users", require("./users"));

router.use("/", (req, res) => res.status(404).send("Route is not valid."))
module.exports = router;
