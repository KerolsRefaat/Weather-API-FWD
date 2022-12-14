// const { response } = require("express");

/* Global Variables */
const generateBtn = document.getElementById('generate');
const key='3efd543a5d9c25974cc2079b3067d065';
const zipValue = document.getElementById('zip');
var allData={};


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+ '/'+ d.getDate()+'/'+ d.getFullYear();

// triggering generate btn
generateBtn.addEventListener('click' , () => {

    // Checking if ZipCode is not empty
    if (zipValue.value!=''){

        //Getting user feelings
        const feelings = document.getElementById('feelings');
        //Setting the API url with entered zip code & api key
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue.value}&appid=${key}&units=metric`;

        const fetchData = async () =>{

          //Fetch Weather API
            const req = await fetch(url);
            try {
            // Convert data into JSON
            var ApiData = await req.json()
            //adding user response & api data in a single object
            allData={ApiData, feelings:feelings.value ,date:newDate};
            }
            catch(error) {
              //handling error
              console.log("error", error);
            }

          //End of fetching

          //Sending Data to my local server
             await fetch ('/postData', {
                method : "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify( allData),
              })
          //End of Sending

          // Fetching Data from my local server & Updating UI
              await fetch ('/localData')
              //Converting Data into JSON format 
              .then((response) => response.json())

              // Updating UI with fetched Data
              .then((data) => {
                document.getElementById('name').innerHTML = "Country : " + data.country;
                document.getElementById('temp').innerHTML ="Temperature : " + data.temp+ ' degrees';
                document.getElementById('weatherState').innerHTML = "Weather : " + data.weather;
                if(feelings.value==''){
                  document.getElementById('content').innerHTML = "User Feelings : No Feelings were written";
      
                }else{
                  document.getElementById('content').innerHTML = "User Feelings : " + data.userFeelings;

                }
                  document.getElementById("date").innerHTML = "Date : " + data.date;
              });
          // End of Fetching & Updating UI
           }
           fetchData();

    }
    
          else {
            alert('Please Enter your Zip Code');
              }
   
});



  