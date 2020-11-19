const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const config = require('../config/database');


router.get('/', (req, res, next) => {
    Post.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err))
});
router.post('/add', (req, res, next) =>{
   const serialNo = req.body.serialNo;
   const news = req.body.news;
   const title = req.body.title;
   const body = req.body.body;
   const email = req.body.email;
   const url = req.body.url;
    newPost =new Post({
        serialNo: serialNo,
        news: news,
        title: title,
        body: body,
        email: email,
        url: url

    });

    newPost.save() 
        .then(post => {
            res.json(post);
        })
        .catch(err => console.log(err));
})

router.put('/update/:id', (req, res, next) => {
    let id = req.params.id;
     Post.findById(id)
     .then(post => {
        post.serialNo = req.body.serialNo;
        post.news = req.body.news;
         post.title = req.body.title;
         post.body = req.body.body;
         post.email = req.body.email;
         post.url = req.body.url;
         post.save()
         .then(post => {
             res.send({
                 message: 'Post updated sucessfully..!!',
                 status: 'sucess',
                 post: post
             })
         })
         .catch(err => console.log(err))
     })
     .catch(err => console.log(err))
} );

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err))
});

router.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id;
     Post.findByIdAndDelete(id)
     .then(post => {
        res.send({
        message: 'Post Deleted sucessfully..!!',
        status: 'sucess',
        post: post
        })
    .catch(err => console.log(err))
     })
     .catch(err => console.log(err))
} );

module.exports = router;


