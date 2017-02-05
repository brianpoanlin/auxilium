var http = require('http');
var express = require('express')
var app = express()


/***   PORTS   ***/
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/send/:eventID', function(req, res) {
    var eventID = req.params.eventID;
    console.log("Sending a notification for Event ID: " + eventID);
    //getEventInfo("-KcAi_9M0J7UAN0za6Df");
    getEventInfo(eventID);
    res.end("Success");
})



/***   FIREBASE   ***/
var firebase = require("firebase");
configureFB();
loginUser();


function configureFB(){
    var firebase = require("firebase");

    var config = {
        apiKey: "AIzaSyBFOJNTJ20zVXF38EnBqsXtf5PoAvax350",
        authDomain: "auxilium-a8562.firebaseapp.com",
        databaseURL: "https://auxilium-a8562.firebaseio.com",
        storageBucket: "auxilium-a8562.appspot.com",
        messagingSenderId: "203387954800"
    };

    firebase.initializeApp(config);
}

function loginUser(){
    var email = "nejosephliu@gmail.com";
    var password = "123456";

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                console.log('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        }).then(function(){
        console.log("Logged in.")
        //getEventInfo("-KcBrVinxXeMi8IKCyGQ");
    });
}

//getEventInfo("-KcAi_9M0J7UAN0za6Df");

function getEventInfo(eventID){
    var eventRef = firebase.database().ref("master-events").child(eventID);

    var eventName;
    var eventCategory;
    var eventTime = {};

    console.log("getting event info...")

    eventRef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            if(key == "event_category"){
                eventCategory = childData;
            }else if(key == "event_name"){
                eventName = childData;
            }else if(key == "event_time"){
                var eventDate, eventHour, eventMinute;

                childSnapshot.forEach(function (timeSnapshot) {
                    var key = timeSnapshot.key;
                    var timeData = timeSnapshot.val();

                    if(key == "event_date"){
                        eventTime["date"] = timeData;
                    }else if(key == "event_hour"){
                        eventTime["hour"] = parseInt(timeData);
                    }else if(key == "event_minute"){
                        eventTime["minute"] = parseInt(timeData);
                    }
                })

            }

        })
    }).then(function(){
        console.log("Event Information Successfully Retrieved!")
        console.log("Event Name: " + eventName);
        console.log("Event Category: " + eventCategory);
        console.log("Event Time: " + eventTime["date"] + ", " + eventTime["hour"] + ":" + eventTime["minute"]);

        var titleString = eventName
        var descriptionString = eventCategory + " - " + eventTime["date"] + " @ " + formatTime(eventTime["hour"], eventTime["minute"]);

        var playerArr = categoryArray(eventCategory, titleString, descriptionString, eventID);

        //sendNote(titleString, descriptionString, eventID);
    })
}

function categoryArray(category, titleString, descriptionString, eventID){
    var playerArr = [];

    var ref = firebase.database().ref("users");
    ref.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log("the key here: " + childSnapshot.key);
            console.log("the clean here: " + childSnapshot.child(category).val());
            if(childSnapshot.child(category).val() == true){
                var playerID = childSnapshot.child("player_id").val();
                playerArr.push(playerID);
            }
        })
    }).then(function () {
        console.log("the player ar: " + playerArr);

        sendNote(titleString, descriptionString, eventID, playerArr);
        //return playerArr;
    })
}


//sendNote("Test Notification", "the test")

/***   HELPER FUNCTIONS   ***/

function formatTime(hour, minute){
    var text = "";
    var amPM = "AM"
    if(hour >= 12){
        amPM = "PM";
        hour = hour - 12;
    }

    if(hour == 0){
        hour = 12;
    }

    var newMinute = minute.toString();

    if(newMinute.length <= 1){
        newMinute = "0" + newMinute;
    }

    return hour + ":" + newMinute + " " + amPM;

}


/***   NOTIFICATION   ***/

function sendNote(title, description, eventID, playerArr) {
    var sendNotification = function (data) {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic NjBkZjI2OGYtNzdlOS00Y2IyLTg0YWMtYzg1ZDUzNzc1YmU5"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');
        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    /*var message = {
        app_id: "11c7b74d-c1bb-4826-afea-3b49d9f0f581",
        contents: {"en": description},
        headings: {"en": title},
        data: {"eventID": eventID},
        included_segments: ["All"]
    };*/

    var message = {
        app_id: "11c7b74d-c1bb-4826-afea-3b49d9f0f581",
        contents: {"en": description},
        headings: {"en": title},
        data: {"eventID": eventID},
        include_player_ids: playerArr
    };

    sendNotification(message);
}