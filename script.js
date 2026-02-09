document.addEventListener("DOMContentLoaded", function () {
    firebase.initializeApp(firebaseConfig);

    var messageSpace = document.getElementById("welcomeMessage");
    messageSpace.innerHTML = "Javascript connected";

    var button = document.getElementById("writeButton");
    button.addEventListener("click", function(){
        var textInput = document.getElementById("fbTextInput");
        firebase.database().ref('/message').set(
            {
                msg: textInput.value
            }
        )
        textInput.placeholder = textInput.value;
        textInput.value = "";
    })

    var loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", function(){
        fb_login();
    })

    document.getElementById("readButton").addEventListener("click", function(){
        fb_readOnce();
    })
})

function fb_readOnce()
{
    console.log("read once");
    firebase.database().ref('/message').on('value', fb_logDatabaseRead, fb_error);
}

function fb_logDatabaseRead(snapshot)
{
    if (snapshot.val() == null)
    {
        console.log("No data value was null");
        return;
    }

    document.getElementById("fbHeader").innerHTML = snapshot.val();
    console.log(snapshot.val());
}

function fb_error(error)
{
    console.log("FB Error")
    console.log(error)
}

function fb_login()
{
    console.log("Logging in");
    firebase.auth().onAuthStateChanged((user) => {
        if (user)
        {
            console.log("logged in");
            console.log(user);
            var uid = user.uid;
            currentUser = user;
        }
        else
        {
            console.log("not logged in");

            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
            })
        }
    })
}