const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   


})

app.post("/", function(req, res){

const query = req.body.stockPrice;
const apiKey="cdd455324fcb054b2ae10ab5877954a6"
const url = "https://financialmodelingprep.com/api/v3/quote/"+query+ "?apikey="+apiKey
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        
      const finData = JSON.parse(data)
      const bigFin = finData[0].price;
      const bigTick= finData[0].symbol;
      const bigOpen= finData[0].open;
      const bigChange= finData[0].change;
      res.write("<h1> The ticker symbol is   " +  bigTick + "</h1>");
      res.write("<h1> the stock opened at " +bigOpen+ "</h1>");
      res.write("<h1> The change was  " +bigChange+ "</h1>");
      res.write("<h1>the stock price of " +query+" is   "  +  bigFin + "</h1> ");
      res.send()
    })
})
})




app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");

});