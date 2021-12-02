//turns on the strict mode
"use strict";
//create variables for DOM elements
const loginBtnSubmit = document.getElementById("login-form-submit");
let email = document.getElementById("txtEmail");
let phoneNumber = document.getElementById("txtPhone");
let regPassword = document.getElementById("reg-txtPassword");
let loginPassword = document.getElementById("login-txtPassword");
let passwordConf = document.getElementById("txtPassConfirm");
let regUsername = document.getElementById("reg-txtUsername");
let loginEmail = document.getElementById("login-txtEmail");
let chkAge = document.getElementById("chkAge");
const btnSignUp = document.getElementsByClassName("sign-up");
const btnSignIn = document.getElementsByClassName("sign-in");
const regWindow = document.getElementById("registration-window");
const loginWindow = document.getElementById("login-window");
const regBtnClose = document.getElementById("reg-closeWindow");
const loginBtnClose = document.getElementById("login-closeWindow");
let signOption = document.getElementById("sign-options");
let indexSignOption = document.getElementById("index-sign-options");
let errorElement = document.getElementsByClassName("error-message");
//variable to store error messages
let errorMessage = "";

//if there is an authorized user this function hides "signUp" and "signIn" buttons and shows username of the current user and "signOut" button
let showCurrentUser = () => {
    if (sessionStorage.currentUser) {
        let user = JSON.parse(sessionStorage.getItem("currentUser"))
        signOption.innerHTML = '<span>Hello, ' + user.username + '</span><span class="sign-out">Sign Out</span>';
        if (indexSignOption) {
            indexSignOption.innerHTML = '<button class="sign-out btnStyle">Sign Out</button>'
        }
        const btnSignOut = document.getElementsByClassName("sign-out");
        for (const element of btnSignOut) {
            element.addEventListener("click", () => {
                sessionStorage.removeItem("currentUser");
                location.reload();
            })
        }
    } 
}
//invokes the function showCurrentUser()
showCurrentUser();

/******* functions for forms validation *******/

//email validation (return true or false)
let isMail = (mail) => {
    var mailPattern = /^([a-zA-Z0-9+-._])+\@(([a-zA-Z-.])+\.)+([a-zA-Z]{2,6})+$/;
    return mailPattern.test(mail);
}

//phone number validation (return true or false)
let isPhone = (phone) => {
    var numberPattern = /^\+([0-9]{6,})$/;
    return numberPattern.test(phone);
}

//password validation (return true or false)
let isPasswordValid = (pass, passConf) => {
    return pass != passConf ? false : true;
}

//checks missing fields (return true or false)
let checkFields = () => {
    if (regUsername.value === "" || 
        email.value === "" ||
        phoneNumber.value === "" ||
        regPassword.value === "" ||
        passwordConf.value === "" ||
        chkAge.checked === false) {
            return false;
        }
    return true;
}
//displays registration form validation errors (returns content of error message variable)
let showRegistrationErrors = () => {
    errorMessage = "";
    if (checkFields() === false) {
        errorMessage += "<p> - fill all fields;<br></p>";
    } 
    if (isMail(email.value) === false) {
        errorMessage += "<p> - check your email address;<br></p>";
    } 
    if (isPhone(phoneNumber.value) === false) {
        errorMessage += "<p> - check format of phone number; <br></p>";
    }
    if (isPasswordValid(regPassword.value, passwordConf.value) === false) {
        errorMessage += "<p> - check your password;<br></p>";
    }
}
//checks if there are errors or not and returns true or false
let isError = () => {
    return errorMessage ? true : false;
}
//checks if such user exists (return true or false)
let userExists = (email) => {
    if(localStorage.getItem(email) != null) {
        return true; 
    } 
    return false;
}
//checks if such username exists (return true or false)
let usernameExists = (username) => {
    for(let i = 0; i < localStorage.length; i++) {
        let email = localStorage.key(i);
        let user = JSON.parse(localStorage.getItem(email));
        if(user.username === username) {
            return true;
        }
    }
    return false;
}


/******* events listening and processing *******/


//opens popup window with registration form
let openWindow = (element) => {
    element.addEventListener("click", () => {
        if (element.classList[0] === "sign-up") {
            regWindow.style.display = "block";
        } else if (element.classList[0] === "sign-in") {
            loginWindow.style.display = "block";
        }
    });
}

//closes popup windows
let closeWindow = (element) => {
    element.style.display = "none";
    errorMessage = "";
    for (const element of errorElement) {
        element.innerHTML = "";
    }
}

//allows to open forms using different buttons
for (const element of btnSignUp) {
    openWindow(element);
}
for (const element of btnSignIn) {
    openWindow(element);
}

//listens and processes click events for close button in registration form
regBtnClose.addEventListener("click", () => {
    closeWindow(regWindow);
});

//listens and processes click events for close button in login form
loginBtnClose.addEventListener("click", () => {
    closeWindow(loginWindow);
});

//adds new user into the local storage
let addNewUser = () => {
    let newUser = {
        "username": regUsername.value,
        "email": email.value,
        "phoneNumber": phoneNumber.value,
        "gender": document.getElementById("sltGender").value,
        "password": regPassword.value,
        "bestResult": 0
    }
    localStorage.setItem(newUser.email, JSON.stringify(newUser));
    localStorage.getItem(newUser.email) ? alert("A new user was added successfully") : alert("Ooopss... it is not good... try again");
}

//process submit event in sign up form
let submitRegForm = () => {
    showRegistrationErrors();
    if (isError()) {
        errorElement[0].innerHTML = errorMessage;
    } else {
        if (userExists(email.value)) {
            errorMessage = "<p> - User with the same email already exists;<br></p>"
            errorElement[0].innerHTML = errorMessage;
        } else if (usernameExists(regUsername.value)) {
            errorMessage = "<p> - User with the same username already exists;<br></p>"
            errorElement[0].innerHTML = errorMessage;
        } else {
            addNewUser();
            closeWindow(regWindow);
        }
    }
}

//process submit event in login form
let submitLoginForm = () => {
    let user = {};
    if (userExists(loginEmail.value)) {
        user = JSON.parse(localStorage.getItem(loginEmail.value));
        if (user && user.password === loginPassword.value) {
            let currentUser = {
                "username" : user.username,
                "email" : user.email
            };
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
            showCurrentUser();
            closeWindow(loginWindow);
        } else {
            errorMessage = "<p> - check your password;<br></p>";
            errorElement[1].innerHTML = errorMessage;
        }
    } else {
        errorMessage = "<p> - check your email address;<br></p>";
        errorElement[1].innerHTML = errorMessage;
    }
}

