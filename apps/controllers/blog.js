var express = require("express");
var router = express.Router();

var post_md = require("../modles/post");

router.get("/", function(req, res){
    // res.json({"message": "This is Blog Page"});

    var data = post_md.getAllPosts();

    data.then(function(posts){
        var result = {
            posts: posts,
            error: false
        };

        res.render("blog/index", {data: result});
    }).catch(function(err){
        var result = {
            error: "Could not get posts data"
        };

        res.render("blog/index", {data: result});
    });

    // res.render("blog/index");
});

router.get("/blog/post/:id", function(req, res){
    var data = post_md.getPostByID(req.params.id);

    data.then(function(posts){
        var post = posts[0];

        var result = {
            post: post,
            error: false
        };

        res.render("blog/post", {data: result});
    }).catch(function(err){
        var result = {
            error: "Could not get post detail"
        };

        res.render("blog/post", {data: result});
    });
});

router.get("/blog/about", function(req, res){
    res.render("blog/about");
});



module.exports = router;