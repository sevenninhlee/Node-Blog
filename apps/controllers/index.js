var express = require("express");
var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/", require(__dirname + "/blog"));

// router.get('/', function (err, res) {
//     res.render("index");
// })

module.exports = router;