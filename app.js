const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {

res.sendFile(__dirname + "/index.html");

    
});

app.post("/", function (req, res) {

    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "210e89db738a52b205b9257a5feaa9f1";
    const units = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";
    https.get(url, function (response) {
        console.log(response.statusCode);
    
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The tyemprature in " + query + " is " + temp + " degrees celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
    
        });
    });

    
});













app.listen(3000, function () {
    console.log("Serever is running on PORT 3000.");
});






            // const object = {
            //     name: "Hashan",
            //     favouriteFood: "Koththu"
            // }
            // console.log(JSON.stringify(object));