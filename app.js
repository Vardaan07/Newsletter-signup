const bodyParser = require("body-parser");
const express= require("express");
const request = require("request");
const https= require("https");




const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){

    var firstname= req.body.fname;
    var lastname=req.body.lname;
    var email= req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"Subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                    
                }


            }
        ]

   };

 const jsonData= JSON.stringify(data);

 
 const url= "https://us10.api.mailchimp.com/3.0/lists/ba245b6a85";

 const options={
    method: "post",
    auth: "tony:66f69225671713e1feb11b8140fda81d-us10",
 }

 const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
    });

request.write(jsonData);
request.end();
});
app.listen(3000,function(){
    console.log("Server is running at port 3000");

});

//29467a46e8b20142a9572c61a68d5a5f-us10
//ba245b6a85