var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


