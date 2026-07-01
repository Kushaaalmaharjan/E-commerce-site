const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res, next)  => {
    try{
        const {name, email, password} = req.body;
        const userExists = await User.findOne({ email});
        if(userExists){
            res.status(400);
            throw new Error('User Already Exists');
        }

        const user = await User.create({ name,email,password});
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch(err){
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(user && (await user.matchpasswords(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }else{
            res.status(401);
            throw new error('Invalid Email or Password');
        }
    } catch(err){
        next(err);
    }
};

module.exports = {registerUser, loginUser};