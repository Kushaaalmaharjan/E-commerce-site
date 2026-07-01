const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next;
    }
    this.password = await bycrypt.hash(this.password, 10);
    next;
});

userSchema.methods.matchpasswords = async function(enteredPassword){
    return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);