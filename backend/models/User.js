const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true,
        unique: true
    },
    privateKey: {
        type: String,
        required: true,
        unique: true
    },
    userType:{
        type: String,
        required: true
    },
    address:{
        type: String,
        requiredPaths : true
    },
    active: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

