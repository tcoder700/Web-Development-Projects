const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { redirect } = require("express/lib/response");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
    var emailId = req.body.email;
    var data = {
        members: [
            {
                email_address: emailId,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "Tathagat:24702640ba6cc246cee495f7dd817f70-us14"
    }
    const url = "https://us14.api.mailchimp.com/3.0/lists/38d040b584"
    const request = https.request(url, options, function (response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        app.post("/failure", function (req, res) {
            res.redirect("/");
        });

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running at port 3000");
});



//api key 24702640ba6cc246cee495f7dd817f70-us14
//38d040b584