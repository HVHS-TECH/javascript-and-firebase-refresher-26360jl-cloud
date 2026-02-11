var currentUser;

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

function saveText()
{
    if (currentUser == null)
    {
        console.log("not logged in")
        alert("Login first to save message");
        return
    }

    var textInput = document.getElementById("userTextInput");

    if (textInput.value.length <= 0)
    {
        alert("No message")
        return
    }

    console.log(Date.now());

    firebase.database().ref('/savedMessages/' + Date.now()).set(
            {
                uid: currentUser.uid,
                name: currentUser.displayName,
                message: textInput.value
            }
    )
}

function showEverything()
{
    firebase.database().ref('/savedMessages/').once('value', writeMessage);
}

function writeMessage(snapshot)
{
    const keysArray = Object.keys(snapshot.val());
    const valuesArray = Object.values(snapshot.val());

    const container = document.getElementById("messageContainer");

    for(var i = keysArray.length - 1; i >= 0; i--)
    {
        displayMessage(container, keysArray[i], valuesArray[i].name, valuesArray[i].message)
    }
}

function displayMessage(container, timeStamp, name, message)
{
    const newParagraph = document.createElement("li");
    newParagraph.textContent = name + ": " + message;
    container.appendChild(newParagraph);
}

function fb_readOnce()
{
    console.log("read once");
    firebase.database().ref('/message').once('value', fb_logDatabaseRead, fb_error);
}

function fb_logDatabaseRead(snapshot)
{
    if (snapshot.val() == null)
    {
        console.log("No data value was null");
        return;
    }

    document.getElementById("fbHeader").innerHTML = snapshot.val().msg
    console.log(snapshot.val().msg);
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