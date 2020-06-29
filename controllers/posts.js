const Post = require('../models/post');

module.exports = app => {
  // CREATE
  app.post('/posts/new', (req, res) => {
    if (req.user) {
      var post = new Post(req.body);
  
      post.save(function(err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
  
  // INDEX
  app.get('/', (req, res) => {
    var currentUser = req.user;

    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  }); 
  
  //SHOW
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('posts-show', { "post": post.toObject() })
    }).catch((err) => {
      console.log(err.message)
    })
  });
  
  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).then(posts => {
        posts = posts.map(function(posts) { return posts.toObject(); });
        console.log(posts)
        res.render("posts-index", { posts });
    })
    .catch(err => {
        console.log(err);
    });
  });
  
};