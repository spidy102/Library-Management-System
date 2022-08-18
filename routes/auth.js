const express = require("express")
const router = express.Router()
const {
  handleLogin,
  handleRegister,
  userHandler,
} = require("../controllers/auth")
const { checkAuthentication } = require("../middleware/auth")

router.route("/register").post(handleRegister)
router.route("/login").post(handleLogin)
router.route("/user").get(checkAuthentication, userHandler)

module.exports = router
