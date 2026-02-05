document.addEventListener("DOMContentLoaded", function () {
    var messageSpace = document.getElementById("welcomeMessage");
    messageSpace.innerHTML = "Javascript connected";

    var button = document.getElementById("button1");
    button.addEventListener("click", function(){
        var textInput = document.getElementById("textInput");
        document.getElementById("heading").innerHTML = textInput.value;
        firebase.database().ref('users/Ben').set(
            {
                age: 99,
                feet: 2,
                hair: "insufficient"
            }
        )
})
})