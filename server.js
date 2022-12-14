// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
 const express = require('express');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json({limit: '1mb'}));


// Setup Server
const portNumber = 8080;
app.listen(8080, function(){console.log(`Listening to Port Number: ${portNumber}`)});

// GET
app.get('/localData', function(request, response){
response.send(projectData);
});

// POST

app.post('/postData', function(request, response){
 const data = request.body;
response.json(
projectData = {
temp: data.ApiData.main.temp,
weather: data.ApiData.weather[0].description,
country:data.ApiData.name,
userFeelings: data.feelings,
date:data.date
})
});