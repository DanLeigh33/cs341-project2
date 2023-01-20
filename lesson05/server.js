const express = require('express');
const app = express();
const conDB = require('./db/connect.js');
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

conDB.connectDB();

app.use(bodyParser.json());

app.use('/', require('./routes'));


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})