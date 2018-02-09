require("dotenv").config();
const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , controller = require('./controller')
    , cors = require('cors');


const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.get('/api/shelf', controller.getShelf);
app.get('/api/bins/:id', controller.getBin);
app.get('/api/product/:id', controller.getProduct);





app.listen(4000, () => {console.log(`Listening on port: 4000`)});