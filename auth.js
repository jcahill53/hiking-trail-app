const jwt = require('jsonwebtoken')

// Don't save this in a repo in a real project
const TOKEN_KEY = "IlFb8MkE7kiebI0erUpIrz9"
// const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

module.exports.createToken = function(identifier){
  // create a token, return the jwt as a string
  const token = jwt.sign(
    {user_id: identifier},
    TOKEN_KEY
  )

  console.log("TOKEN: ", token)
  return token
}

module.exports.verifyToken = function(req, res, next){
  const token = req.body.token || req.headers["x-access-token"]

  if(!token){ return res.status(403).send("A token is required")}

  try {
    //If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
    const decoded = jwt.verify(token, TOKEN_KEY);
    console.log("DECODED: ", decoded)
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next()
}