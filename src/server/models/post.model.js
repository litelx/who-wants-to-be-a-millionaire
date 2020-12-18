var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    guest: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    contentType: {
        type: Number,
        required: false
    },
    shareTime: {
        type: Number,
        required: false
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);


