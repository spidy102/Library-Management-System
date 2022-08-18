const checker = require("../utils/checker")
const { signUp, signIn } = require("../services/auth")

exports.handleRegister = (req, res, next) => {
  let { name, id, password } = req.body

  if (!name || !id || !password || (name && name.trim().length === 0)) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    })
  }
  name = name.replace(/\s{2,}/g, " ")
  if (!checker.alphabetic(name)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a Name with only alphabetic characters",
    })
  }
  if (!checker.password(password)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a strong password",
    })
  }

  signUp({ name, id, password }, res, next)
}

exports.handleLogin = (req, res, next) => {
  let { id, password } = req.body

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    })
  }

  signIn({ id, password }, res, next)
}

exports.userHandler = (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  })
}
