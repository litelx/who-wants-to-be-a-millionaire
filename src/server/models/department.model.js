var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);


