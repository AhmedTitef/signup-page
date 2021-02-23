const express = require('express');

const bodyParser = require("body-parser");

const https = require("https");


const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/" , function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName + lastName + email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME : lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/aea6bfd0db";

  const options ={
    method:"POST",
    auth: "ahmed1:63abfb73b5bd6362b7958a66ec974035-us1",
  };

  const request  = https.request(url , options, function(response){

console.log(response.statusCode);
    if (response.statusCode === 200)
{
  res.sendFile(__dirname + "/success.html");
} else{
  res.sendFile(__dirname + "/failure.html");
}


   // response.on("data", function(data){
   //    console.log(JSON .parse(data));
   //  });


  });

  request.write(jsonData);
  request.end();

app.post("/failure" , function(req,res){
  res.redirect("/");
});


});

// process.env.PORT
app.listen(process.env.POST || 3000, function(){
  console.log("server is up");
});


// 63abfb73b5bd6362b7958a66ec974035-us1

// aea6bfd0db
