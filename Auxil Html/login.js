function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //console.log("user: " + firebase.auth().currentUser.email);

    if(email.length <= 0){
        alert("Please enter your email.")
    }else if(password.length <= 0){
        alert("Please enter your password.")
    }else{
        loginFB(email, password);
    }
}

configFB();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("the user");

        //REDIRECT
    } else {
        //console.log("no user");
    }
});

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

function loginFB(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        }).then(function (){
        console.log("user: " + firebase.auth().currentUser.email);

    });
}

//firebase.auth().signOut();