const Jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const privateKey = process.env.privateKey;

exports.authentication = async (req, res, next) => {    
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    //console.log('middleware auth', token);
    if (!token) {
        return res.status(401).json({ status: false, data: 'Token missing' });
    }
    Jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: false, data: 'Invalid token' });
        }
        // You can attach decoded user info to request if needed:
        req.user = decoded;
        next();
    });
}