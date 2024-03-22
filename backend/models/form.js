const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordSchema = new Schema({
    website: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

const Passwords = mongoose.model('password', PasswordSchema);
module.exports = Passwords;