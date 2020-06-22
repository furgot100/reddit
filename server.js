const express = require('express')
const app = express()
const port = 3000
require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index')
});

app.get('/posts/new', (req,res) =>{
    res.render('posts-new')
})

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);  
