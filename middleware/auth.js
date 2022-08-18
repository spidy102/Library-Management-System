const jwt = require("jsonwebtoken")

exports.checkAuthentication = (req, res, next) => {
  // Proceed for authentication
  let token

  // Check request headers has a "authorization" key
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Set token from request headers
    token = req.headers.authorization.split(" ")[1] // Bearer tokenXXX
  }

  // check token exists or not
  if (!token) {
    // Otherwise throw 401 unauthorized
    return res.status(401).json({
      message: "You are not unauthorized to access the resource",
      success: false,
    })
  }

  // Decode and Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({
        message: "Session Expired! Kindly login again",
        success: false,
      })
    }

    // Finding user with decoded email address
    let query = `
                SELECT 
                    id, 
                    name
                    FROM LIBRARY.STUDENT WHERE id = "${decodedToken.id}";
            `

    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(403).json({
          message: "Session Expired! Kindly login again",
          success: false,
        })
      }

      // validate results
      if (result.length === 0)
        return res.status(403).json({
          message:
            "Oops! No user found. Maybe your account disabled or permanently deleted.",
          success: false,
        })

      // set user object to the request
      req.user = result[0]
      next()
    })
  })
}
