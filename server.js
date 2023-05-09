const express = require('express')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require("mongoose");

//set up cors
const cors = require("cors")
app.use(cors())

//set up to Parse JSON data
app.use(express.json());

//set up helmet
const helmet = require("helmet");
app.use(helmet());

//bodyparser to allow json objects to be passed to the server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//declare routes:
const carRoutes = require('./routes/carRoutes');

//connnect to mongo cars database
mongoose.connect('mongodb+srv://alexelliott90:RBP2hrrhp6bLUj7D@ae22110005422.ppxdeht.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Successfully connected to database!');
})
.catch((error) => {
  console.log('Error - could not connect to database:', error.message);
});

//set up the route
app.use("/cars", carRoutes)




app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`)
})