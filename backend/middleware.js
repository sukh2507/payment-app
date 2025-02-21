const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    // console.log("this is jwt secret :", JWT_SECRET)
    const authheader = req.headers.authorization;  // Lowercase 'authorization'
    // console.log(authheader)
    if (!authheader || !authheader.startsWith("Bearer ")) {
        return res.status(403).send({ message: "Please provide a valid JWT token" });
    }

    const token = authheader.split(" ")[1]; console.log(token) // Correctly split the token

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(403).json({
            message: "Please provide a valid JWT token"
        });
    }
};

module.exports = { authmiddleware };