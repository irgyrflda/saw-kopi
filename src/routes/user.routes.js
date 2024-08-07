const router = require("express").Router();
const {
    login,
    register,
    logout
} = require("../controller/user");
const { cekSecretKey } = require("../middleware/authorization");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", cekSecretKey, logout);

module.exports = router;