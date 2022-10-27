const router = require("express").Router();
const {register_page, register, login_page, login, logout, change_password_page, change_password} = require("../controllers/auth");
const {protect} = require("../middleware/authMiddleware")
router.route("/register").get(register_page).post(register);
router.route("/login").get(login_page).post(login)
router.route("/logout").get(logout)
router.route("/change_password").get(protect,change_password_page).post(protect, change_password)

module.exports = router;