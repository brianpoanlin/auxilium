var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBFOJNTJ20zVXF38EnBqsXtf5PoAvax350",
    authDomain: "auxilium-a8562.firebaseapp.com",
    databaseURL: "https://auxilium-a8562.firebaseio.com",
    storageBucket: "auxilium-a8562.appspot.com",
    messagingSenderId: "203387954800"
};

firebase.initializeApp(config);

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
        getEventInfo("-KcAi_9M0J7UAN0za6Df");
});

function getEventInfo(eventID){
    var eventRef = firebase.database().ref("master-events").child(eventID);

    var eventName;
    var eventCategory;
    var eventTime = {};

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
                        eventTime["hour"] = timeData;
                    }else if(key == "event_minute"){
                        eventTime["minute"] = timeData;
                    }
                })

            }
        })
    })
}


function readFB() {
    var eventRef = firebase.database().ref("master-events");
    console.log("ref: " + eventRef);

    eventRef.once("value")
        .then(function (snapshot) {
            var key = snapshot.key; // null

            console.log("the key: " + key);
            //var childKey = snapshot.child("users/ada"); // "ada"
            snapshot.forEach(function (childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();

                childSnapshot.forEach(function (childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var thisKey = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var thisChildData = childSnapshot.val();

                    console.log("key: " + thisKey + "; child: " + thisChildData);
                });
            });

        });
}

/*var admin = require("firebase-admin");

 var serviceAccount = require("./firebase-key.json");

 admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://auxilium-a8562.firebaseio.com/"
 });

 //var db = admin.database();

 console.log("yoyo");

 var ref = admin.database().ref();//.ref("master-events");//.child("-KcAi_9M0J7UAN0za6Df");

 console.log("the ref: " + ref.key);

 var usersRef = ref.child("helloref");
 usersRef.set({
 alanisawesome: {
 date_of_birth: "June 23, 1912",
 full_name: "Alan Turing"
 },
 gracehop: {
 date_of_birth: "December 9, 1906",
 full_name: "Grace Hopper"
 }
 });

 /*ref.once("value")
 .then(function(snapshot) {
 //var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
 //var firstName = snapshot.child("name/first").val(); // "Ada"
 //var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
 //var age = snapshot.child("age").val(); // null

 console.log("hey there");
 });
 */