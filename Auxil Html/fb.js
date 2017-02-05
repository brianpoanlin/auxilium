configFB();

function configFB(){
    var config = {
        apiKey: "AIzaSyBFOJNTJ20zVXF38EnBqsXtf5PoAvax350",
        authDomain: "auxilium-a8562.firebaseapp.com",
        databaseURL: "https://auxilium-a8562.firebaseio.com",
        storageBucket: "auxilium-a8562.appspot.com",
        messagingSenderId: "203387954800"
    };

    firebase.initializeApp(config);
}