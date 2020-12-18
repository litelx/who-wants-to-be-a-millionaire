var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {
        type: String,
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
    price: {
        type: Number,
        required: false
    },
    department_main: {
        type: Number,
        required: false
    },
    department_sub: {
        type: Number,
        required: false
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);


