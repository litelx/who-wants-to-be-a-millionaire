var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false
    },
    contactEMail: {
        type: String,
        required: false
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);


