const router = require("express").Router();
const {
    login,
    register,
    logout,
    getAllUsers,
    getByUsername,
    UpdateRoleUsername,
    DeleteRoleUsername
} = require("../controller/user");
const { cekSecretKey } = require("../middleware/authorization");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", cekSecretKey, logout);
router.get("/admin", cekSecretKey, getAllUsers);
router.get("/admin/:username", cekSecretKey, getByUsername);
router.put("/admin/:username", cekSecretKey, UpdateRoleUsername);
router.delete("/admin/:username", cekSecretKey, DeleteRoleUsername);

module.exports = router;