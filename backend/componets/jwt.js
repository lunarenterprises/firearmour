const jwt = require('jsonwebtoken');

// JWT middleware
const verifyToken = (req, res, next) => {
    var SECRET_KEY = "dkjghkdghfhglknghdxlkdnflsfjopoijoigjhpokp"
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Authentication failed: Invalid token" });
        }

        req.user = decoded
        console.log(req.user);
        next();
    });
};

module.exports = { verifyToken };
