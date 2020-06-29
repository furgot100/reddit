const Post = require('../models/post');

module.exports = app => {
  // CREATE
  app.post('/posts/new', (req, res) => {
      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      
      // post.toObject()
      
      // SAVE INSTANCE OF POST MODEL TO DB
      post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
      })
  });
  
  // INDEX
  app.get('/', (req, res) => {
      Post.find({}).lean()
          .then(posts => {
              res.render("posts-index", { posts });
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