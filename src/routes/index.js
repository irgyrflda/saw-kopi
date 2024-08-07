//INDEX ROUTES
const router = require("express").Router();

const user = require("./user.routes");
const kopi = require("./kopi.routes");

router.use("/users", user)
router.use("/kopi", kopi);

module.exports = router