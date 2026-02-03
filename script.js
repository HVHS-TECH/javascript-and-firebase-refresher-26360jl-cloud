//var messageSpace = document.getElementbyId("welcomeMessage");
document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("button1");
    button.addEventListener("click", function(){
        var textInput = document.getElementById("textInput");
        document.getElementById("heading").innerHTML = textInput.value;
})
})