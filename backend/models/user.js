const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
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
    isAdmin: Boolean,
    CreatedDate: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;