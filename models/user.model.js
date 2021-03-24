const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        validator: isEmail
    },
    dateOfBirth: {
        type: Schema.Types.String,
        required: true
    },
    bio: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);