<?php
    //creates a head of the html document. It gets an optional parameter and invokes function "addStyles"
    function addHtmlHead($pageName = FALSE) {
        echo "<!DOCTYPE html>";
        echo "<html>";
        echo "<head>";
        echo '<meta charset="utf-8">';
        echo '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
        echo "<title>UFO Wars</title>";
        echo "<!-- external css styles -->";
        echo '<link  rel="stylesheet" type="text/css" href="static/style/style.css">';
        addStyles($pageName);
        echo "</head>";
        echo "<body>";
    }

    //creates internal css styles
    function addStyles($pageName) {
        if ($pageName) {
            echo '<style>';
            echo 'table {';
            echo 'margin: 0 auto;';
            echo 'font-size: 1.2vw;';
            echo 'text-align: center;';
            echo 'border-collapse: collapse;';
            echo 'font-family: Arial, Helvetica, sans-serif;';
            echo 'margin-bottom: 5vh;';
            echo '}';
            echo 'table th, td, tr {';
            echo 'height: 5vh;';
            if ($pageName == "leaderboard") {
                echo 'width: 15%;';
                echo 'border: solid 2px #000;';
            } else {
                echo 'width: 10%;';
            };
            echo '}';
            echo '</style>';
        }
    }

    //creates the header with logo, the name of the website and signIn/signUp buttons
    function addPageHeader() {
        echo "<!-- Header -->";
        echo "<header>";
        echo "<!-- Logo -->";
        echo '<img src="static/images/logo.png" alt="logotype of the website">';
        echo "<h2>UFO WARS</h2>";
        echo "<!-- signUp and signIn buttons -->";
        echo "<div id='sign-options'>";
        echo '<span class="sign-in">Sign In</span>';
        echo '<span class="sign-up">Sign Up</span>';
        echo "</div>";
        echo "</header>";
    }

    /*  
        - creates the navigation bar for webpages.
        - checks the parameter of the function and add the class "active" to respective menu item.
        - adds links to menu items to navigate between pages.
    */
    function addNavBar($menuItem) {
        // associative array with all menu items and links for respective webpages
        $allMenuItems = array("Home" => "index.php", "Game" => "game.php", "How to play" => "rules.php", "Leader board" => "leaderboard.php", "About us" => "about.php");
        echo "<!-- the navigation bar -->";
        echo "<nav>";
        echo '<ul class="main-nav">';
        //iterates all menu items and creates respective html code       
        foreach($allMenuItems as $key => $value) {
            echo "<a class='menu-item ";
            if ($key == $menuItem) {
                echo "active ";
            };
            echo "' href='".$value."'>";
            echo "<li>".$key."</li>";
            echo "</a>";
        };
        echo "</ul>";
        echo "</nav>";
    }

    //creates registration form
    function addRegistrationForm() {
        echo '<!-- Registration modal window -->';
        echo '<div id="registration-window" class="popup-window">';
        echo '<div class="sign-form">';
        echo '<span id="reg-closeWindow" class="closeWindow">&times;</span>';
        echo '<h1>Sign up Form</h1>';
        echo '<div class="error-message required-field"></div>';
        echo '<form onsubmit="return false;">';
        echo '<label for="txtUsername">Username <span class="required-field">*</span>:</label>';
        echo '<input type="text" id="reg-txtUsername" required name="username">';
        echo '<br>';
        echo '<label for="txtEmail">Email <span class="required-field">*</span>:</label>';
        echo '<input type="text" id="txtEmail" placeholder="e.g. youraddress@example.com" required name="email">';
        echo '<br>';
        echo '<label for="txtPhone"> Phone number <span class="required-field">*</span>:</label>';
        echo '<input type="text" id="txtPhone" placeholder="format +0123456789" required name="phone">';
        echo '<br>';
        echo '<label for="sltGender">Gender <span class="required-field">*</span>:</label>';
        echo '<select id="sltGender" required name="gender">';
        echo '<option value="male">Male</option>';
        echo '<option value="female">Female</option>';
        echo '<option value="other">other</option>';
        echo '</select>';
        echo '<br>';
        echo '<label for="txtPassword">Password<span class="required-field">*</span>:</label>';
        echo '<input type="password" id="reg-txtPassword" required name="password">';
        echo '<br>';
        echo '<label for="txtPassConfirm">Confirm password <span class="required-field">*</span>:</label>';
        echo '<input type="password" id="txtPassConfirm" required name="confpassword">';
        echo '<br>';
        echo '<input type="checkbox" id="chkAge" required name="chkage">';
        echo '<label id="chkAgeLabel" for="chkAge">Confirm that you are over 12 years old <span class="required-field">*</span></label>';
        echo '<br>';
        echo '<p><span class="required-field">*</span> Required fields</p>';
        echo '<input id="reg-form-submit" onclick="submitRegForm();" class="btnSubmit" type="submit" value="submit">';
        echo '</form>';
        echo '</div>';
        echo '</div>';
    }

    //creates login form
    function addLoginForm() {
        echo '<!-- Login modal window -->';
        echo '<div id="login-window" class="popup-window">';
        echo '<div class="sign-form">';
        echo '<span id="login-closeWindow" class="closeWindow">&times;</span>';
        echo '<h1>Sign In Form</h1>';
        echo '<div class="error-message required-field"></div>';
        echo '<form onsubmit="return false;">';
        echo '<label for="txtEmail">Email:</label>';
        echo '<input type="text" id="login-txtEmail" required name="email">';
        echo '<br>';
        echo '<label for="txtPassword">Password:</label>';
        echo '<input type="password" id="login-txtPassword" required name="password">';
        echo '<br>';
        echo '<input type="checkbox" id="savePass" name="savePass">';
        echo '<label id="savePassLabel" for="savePass">Save password</label>';
        echo '<br>';
        echo '<input id="login-form-submit" onclick="submitLoginForm();" class="btnSubmit" type="submit" value="submit">';
        echo '</form>';
        echo '</div>';
        echo '</div>';
    }

    //creates footer of the webpage
    function addFooter($pageName = FALSE) {
        echo '<!-- footer -->';
        echo '<footer>';
        echo '<p class="footer-item">Contact us:</p>';
        echo '<div class="footer-item">';
        echo '<p>email: ufowars@example.com</p>';
        echo '<p>phone: +1 (234) 567-89-01</p>';
        echo '</div>';
        echo '<h3 class="footer-item age-limit">12+</h3>';
        echo '</footer>';
        echo '<script src="static/js/form-processing.js"></script>';
        if ($pageName == "game") {
            echo '<script src="static/js/element.js"></script>';
            echo '<script src="static/js/bullet.js"></script>';
            echo '<script src="static/js/game.js"></script>';
        } else if ($pageName == "leaderboard") {
            echo '<script src="static/js/leader-board.js"></script>';
        }
        echo '</body>';
        echo '</html>';
    }
?>