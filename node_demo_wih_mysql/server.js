const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const common_helper = require('./app/helper/common');
const app = express();

// Setup server port
const port = process.env.DB_PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const name = 'Ankita';
const greeting = common_helper.greetUser(name);
console.log(greeting);

// Router-level middleware
app.use((req, res, next) => {
    console.log('Request URL-------->:', req.originalUrl);
    next();
});

// define a root route
app.get('/', (req, res) => {
    res.send("Hello World"); //sent to postman 
});

const web_route = require('./routes/web')
app.use('/api', web_route)


// 404 page
app.use((req, res) => {
    res.json({ error: true, message: "PAGE NOT FOUND1" });
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


//https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6