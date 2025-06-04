const userSchema = require("../models/users");

//@Dec      Get all user
//@Routes   Get /api/v1/getusers
//@acess    Public


//@Dec      Add user
//@Routes   Post /api/v1/users/register
//@acess    Public
exports.createUser = async (req, res, next) => {
    //console.log(req.body);
    const userDeatils = await userSchema.create(req.body);
    let userInfo = userDeatils.toObject();
    delete userInfo.password;
    res.status(200).json({ success: true, data: userInfo });
}

//@Dec      Add user
//@Routes   Get /api/v1/users/login
//@acess    Public
exports.loginUser = async (req, res, next) => {
    //console.log(req.body);
    if (req.body.email && req.body.password) {
        const userDeatils = await userSchema.findOne(req.body).select('-password');
        if (userDeatils) {
            res.status(200).json({ success: true, data: userDeatils });
        } else {
            res.status(200).json({ success: false, data: 'No data found.' });
        }
    } else {
        res.status(200).json({ success: false, data: 'Data mismatche.' });
    }

}