const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config");

exports.generateJWT = (user) => {
    const payload = {
        id: user._id,
        login: user.login
    }
    const token = jwt.sign(payload, jwtConfig.Secret, jwtConfig.Options);
    return token;
}