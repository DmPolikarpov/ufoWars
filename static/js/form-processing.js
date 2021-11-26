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
let errorElement = document.getElementsByClassName("error-message")[0];
let errorMessage = "";

//if there is an authorized user this function hides "signUp" and "signIn" buttons and shows username of the current user and "signOut" button
let showCurrentUser = () => {
    if (sessionStorage.currentUser) {
        let user = JSON.parse(sessionStorage.getItem("currentUser"))
        signOption.innerHTML = '<span>Hello, ' + user.username + '</span><span class="sign-out">Sign Out</span>';
        const btnSignOut = document.getElementsByClassName("sign-out")[0];
        btnSignOut.addEventListener("click", () => {
            sessionStorage.removeItem("currentUser");
            location.reload();
        })
    } 
}
showCurrentUser();

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
}
//checks if there are errors or not and returns true or false
let isError = () => {
    return errorMessage ? true : false;
}
//checks if such user exists
let userExists = (email) => {
    if(localStorage.getItem(email) != null) {
        return true; 
    } 
    return false;
}
//checks if such username exists
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
            alert("okay");
            regWindow.style.display = "block";
        } else if (element.classList[0] === "sign-in") {
            loginWindow.style.display = "block";
        }
    });
}

//closes popup window
let closeWindow = (element) => {
    element.style.display = "none";
    errorMessage = "";
    errorElement.textContent = "";
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
    localStorage.getItem(newUser.email) ? alert("A new user was added successfully") : alert("Oppss... it is not good... try again");
}

//process submit event in sign up form
let submitRegForm = () => {
    showRegistrationErrors();
    if (isError()) {
        errorElement.textContent = errorMessage;
    } else {
        if (userExists(email.value)) {
            alert("User with the same email already exists");
        } else if (usernameExists(regUsername.value)) {
            alert("User with the same username already exists");
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
            alert("check your password");
        }
    } else {
        alert("check your email address");
    }
}

