

function signUp() {
    console.log("u here");

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("c-password").value;

    console.log("name: " + name);
    console.log("email: " + email);
    console.log("pass: " + password);
    console.log("c-pass: " + cpassword);

    if(name.length <= 0){
        alert("Please enter a name.");
    }else if(email.length <= 0){
        alert("Please enter an email.");
    }else if(password.length <= 0){
        alert("Please enter a password.");
    }else if(cpassword.length <= 0){
        alert("Please confirm your password.");
    }else if(password != cpassword){
        alert("Passwords do not match. Please try again.");
    }else{
        createUser(email, password);
    }
}

function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}