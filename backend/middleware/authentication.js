const Jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const privateKey = process.env.privateKey;

exports.authentication = async (req, res, next) => {    
    let token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1];
        //console.log('middleware auth', token);
        Jwt.verify(token, privateKey, (err, valid) => {
            if(err){
                res.status(403).json({ status: false, data: 'Please add valid token.' });
            }else{
                next();
            }
        })
    }else{
        res.status(401).json({ status: false, data: 'Please add token on header.' }); 
    }
    next();
}