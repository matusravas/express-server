const jwt = require("jsonwebtoken")
const jwtConfig = require("../configs/jwt.config");

module.exports = ((req, res, next) => {
    if (typeof req.headers["authorization"] !== 'undefined') {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, jwtConfig.Secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: {
                        message: "Token is not valid",
                        desc: err.message
                    }
                });
                return;
            }
            // res.headers["data"] = decoded;
            console.log(decoded);
            next();
        });
    }
    else {
        res.status(401).json({
            error: {
                message: "Token is missing"
            }
        });
    }
});