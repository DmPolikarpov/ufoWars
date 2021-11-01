var btnSignUp = document.getElementsByClassName("sign-up");
var btnSignIn = document.getElementsByClassName("sign-in");
var regWindow = document.getElementById("registration-window");
var loginWindow = document.getElementById("login-window");
var regBtnClose = document.getElementById("reg-closeWindow");
var loginBtnClose = document.getElementById("login-closeWindow");



//opens popup window with registration form
function openWindow(element) {
    element.addEventListener("click", function() {
        if (element.classList[0] === "sign-up") {
            regWindow.style.display = "block";
        } else if (element.classList[0] === "sign-in") {
            loginWindow.style.display = "block";
        }
    });
}
for(var i=0; i<btnSignUp.length; i++) {
    openWindow(btnSignUp[i]);
}
for(var i=0; i<btnSignIn.length; i++) {
    openWindow(btnSignIn[i]);
}


//listens and processes click events for close button in registration form
regBtnClose.addEventListener("click", function() {
    regWindow.style.display = "none";
});

//listens and processes click events for close button in login form
loginBtnClose.addEventListener("click", function() {
    loginWindow.style.display = "none";
});


