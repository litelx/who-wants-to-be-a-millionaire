var express = require('express');
var router = express.Router();

const Post = require('../models/post.model');
const User = require('../models/user.model');

router.get('/posts', (req, res, next) => {
    // res.send('Retriving posts list', req);
    Post.find(function (err, posts) {
        res.json(posts);
    });
});

router.get('/posts/:id', (req, res, next) => {
    // res.send('Retriving posts list', req);
    console.log(req);
    Post.find(function (err, posts) {
        res.json(posts);
    });
});

router.post('/posts', (req, res, next) => {
    // res.send('Posting post item');
    console.log(req.body);
    let postItem = new Post({
        id: req.body.id,
        guest: req.body.guest.id,
        content: req.body.content.description,
        contentType: req.body.content.contentType,
        shareTime: req.body.shareTime
    });
    // res.send('Posting post item',postItem);
    console.log(postItem);

    postItem.save((err, post) => {
        if (err) {
            console.log('Failed to save post');
            res.json({ msg: 'Failed to save post', err });
        } else {
            res.json({ msg: 'Post added successfully' , post: post});
        }
    });
});

router.post('/addUser', (req, res, next) => {
    // res.send('Posting post item');
    console.log(req.body);
    let userItem = new User({
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    });
    // res.send('Posting post item',postItem);
    console.log(userItem);

    userItem.save((err, post) => {
        if (err) {
            console.log('Failed to save user');
            res.json({ msg: 'Failed to save user', err });
        } else {
            res.json({ msg: 'User added successfully' , post: post});
        }
    });
});

router.delete('/posts/:id', (req, res, next) => {
    console.log('Deleting post', req.params);
    Post.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log('Failed to delete post');
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
