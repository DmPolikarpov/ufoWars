const regBtnSubmit = document.getElementById("reg-form-submit");
const loginBtnSubmit = document.getElementById("login-form-submit");
let email = document.getElementById("txtEmail");
let phoneNumber = document.getElementById("txtPhone");
let regPassword = document.getElementById("reg-txtPassword");
let loginPassword = document.getElementById("login-txtPassword");
let passwordConf = document.getElementById("txtPassConfirm");
let regUsername = document.getElementById("reg-txtUsername");
let loginUsername = document.getElementById("login-txtUsername");
let chkAge = document.getElementById("chkAge");
const btnSignUp = document.getElementsByClassName("sign-up");
const btnSignIn = document.getElementsByClassName("sign-in");
const regWindow = document.getElementById("registration-window");
const loginWindow = document.getElementById("login-window");
const regBtnClose = document.getElementById("reg-closeWindow");
const loginBtnClose = document.getElementById("login-closeWindow");
let errorElement = document.getElementsByClassName("error-message")[0];
let errorMessage = "";


//closes popup window
let closeWindow = (element) => {
    element.style.display = "none";
    errorMessage = "";
    errorElement.textContent = "";
}


/******* functions for forms validation *******/


//email validation
let isMail = (mail) => {
    var mailPattern = /^([a-zA-Z0-9+-._])+\@(([a-zA-Z-.])+\.)+([a-zA-Z]{2,6})+$/;
    return mailPattern.test(mail);
}

//phone number validation
let isPhone = (phone) => {
    var numberPattern = /^\+([0-9]{6,})$/;
    return numberPattern.test(phone);
}

//password validation
let isPasswordValid = (pass, passConf) => {
    return pass != passConf ? false : true;
}

//checks missing fields
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
//displays registration form validation errors
let showRegistrationErrors = () => {
    errorMessage = "";
    if (checkFields() === false) {
        errorMessage += " fill all fields; ";
    } 
    if (isMail(email.value) === false) {
        errorMessage += " check your email address; ";
    } 
    if (isPhone(phoneNumber.value) === false) {
        errorMessage += " check format of phone number; ";
    }
    if (isPasswordValid(regPassword.value, passwordConf.value) === false) {
        errorMessage += " check your password; ";
    }
    errorElement.textContent = errorMessage;
}
//checks if there are errors or not and returns true or false
let isError = () => {
    return errorMessage ? true : false;
}


/******* events listening and processing *******/


//opens popup window with registration form
function openWindow(element) {
    element.addEventListener("click", () => {
        if (element.classList[0] === "sign-up") {
            regWindow.style.display = "block";
        } else if (element.classList[0] === "sign-in") {
            loginWindow.style.display = "block";
        }
    });
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


//process submit event in sign up form
regBtnSubmit.addEventListener("click", () => {
    showRegistrationErrors();
    if (isError()) {
        alert("errors");
    }
})

//process submit event in login form
loginBtnSubmit.addEventListener("click", () => {
    errorMessage = "";  
    errorElement.textContent = errorMessage;
})

