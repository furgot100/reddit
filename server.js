require('dotenv').config();
// Initialize
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 3000
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
};



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Middleware
const exphbs  = require('express-handlebars');

// Set db
require('./data/reddit-db');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

app.use(cookieParser()); // Add this after you initialize express.

// app.get('/', (req, res) => {
//     // res.send('Hello World!')
//     res.render('index')
// });

app.get('/posts/new', (req,res) =>{
    res.render('posts-new')
})

app.use(checkAuth);
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

module.exports = app;
app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);  
