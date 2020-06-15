const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index')
});

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);  
