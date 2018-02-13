require("dotenv").config();
const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , controller = require('./controller')
    , cors = require('cors');


const app = express();
//76F
app.use(bodyParser.json());

//70C
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})
//74D1-D4
//76D
//76D
app.get('/api/shelf', controller.getShelf);
app.get('/api/bins/:id', controller.getBin);
app.get('/api/bin/:id', controller.getProduct);
app.post('/api/bin/:id', controller.addBin);
app.put('/api/bin/:id', controller.updateBin);
app.delete('/api/bin/:id', controller.deleteProduct);





app.listen(4000, () => {console.log(`Listening on port: 4000`)});