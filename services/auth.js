const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Sign up service
const signUp = (data, res, next) => {
  let { name, id, password } = data
  // Hashing Password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "Unable to register",
      })

    let query = `
				INSERT INTO LIBRARY.STUDENT(NAME, ID, Password)
					VALUES(
						"${name}",
						"${id}",
						"${hash}"
					);
				`

    db.query(query, (err) => {
      if (err) {
        console.log(err)
        if (err.code === "ER_DUP_ENTRY")
          return res.status(403).json({
            success: false,
            message: "BITS ID already in use!",
          })
        else
          return res.status(400).json({
            success: false,
            message: "Unable to register",
          })
      }

      let data = {
        payload: {
          id,
        },
        message:
          "User registration successful. Kindly verify your email address",
        user: {
          name,
          id,
        },
      }

      sendTokenResponse(data, 201, res, next)
    })
  })
}

// Sign in service
const signIn = (data, res, next) => {
  // Finding user with given email address
  let query = `
		SELECT 
			id, 
            name,password
		FROM LIBRARY.STUDENT WHERE id = "${data.id}";
	`
  db.query(query, (err, result) => {
    if (err) return next(err)

    // validate results
    if (result.length === 0)
      return res.status(401).json({
        success: false,
        message: "Incorrect BITS ID or Password! Please try again",
      })

    // extract emails, password and email_verification_status
    let { id, password } = result[0]

    bcrypt.compare(data.password, password, function (err, matched) {
      if (err) return next(err)

      if (!matched)
        return res.status(401).json({
          success: false,
          message: "Incorrect BITS ID or Password! Please try again",
        })

      // Successful Response
      let data = {
        payload: {
          id,
        },
        message: "Successfully signed in",
        user: {
          ...result[0],
          password: undefined,
        },
      }

      // create Token and send with cookies
      sendTokenResponse(data, 200, res, next)
    })
  })
}

// Send Token with Cookie
const sendTokenResponse = (data, statusCode, res, next) => {
  // Create Token
  jwt.sign(
    data.payload,
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
    (err, accessToken) => {
      if (err) return next(err)

      res.status(statusCode).json({
        success: true,
        message: data.message,
        responses: {
          accessToken,
          user: data.user,
        },
      })
    }
  )
}

module.exports = { signUp, signIn }
