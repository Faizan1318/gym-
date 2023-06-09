
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.static("public/styles.css"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html")
});

app.get("/sign.html",function(req,res){
  res.sendFile(__dirname +"/sign.html")
});

app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data ={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/5451625e38";

const options = {
  method: "POST",
  auth: "faizan:9264ba21e9c37783718c85cc779846ce-us13"
}

const request = https.request(url, options, function(response){
response.on("data", function(data){
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});

app.get("/contact.html",function(req,res){
  res.sendFile(__dirname +"/contact.html")
});

app.get("/about.html",function(req,res){
  res.sendFile(__dirname +"/about.html")
});




app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

// API Key
// 9264ba21e9c37783718c85cc779846ce-us13
// list id
// 5451625e38
