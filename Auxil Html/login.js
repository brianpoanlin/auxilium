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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("the user");
        console.log("user: " + firebase.auth().currentUser.email);
		console.log("user: " + firebase.auth().currentUser.displayName);
		window.location.href = "dashboard.html";
    } else {
        console.log("no user");
    }
});


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