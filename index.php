<?php
    //connects common.php to the page
    include('common.php');

    //inserts the head of the html document into the page
    addHtmlHead();

    //inserts the header with logo, the name of the website and signIn/signUp buttons into the webpage
    addPageHeader();

    //inserts the navigation bar into the webpage
    addNavBar("Home");
?>

    <!-- the main content -->
    <div class="content">

<?php
    //inserts registration form
    addRegistrationForm();

    //inserts login form
    addLoginForm();
?>

        <h1>Welcome to our amazing game!</h1>
        <!-- video of the game -->
        <div class="game-video">
            <video autoplay muted controls loop>
                <source src="static/video/video.mp4" type="video/mp4">
                Please, update your browser.
            </video>
        </div>
        <!-- game description -->
        <div class="description section">
            <h2 class="section-title">Description:</h2>
            <p>UFO WARS is a shooter game. In this game user control an UFO that protects its planet from attacks of other UFO. 
                Enemy UFO is trying to kill the UFO of the user and destroy the planet of the user.</p>
            <p>The user has 3 attempts and should hit the enemy UFO 3 times to kill it. 
                After each successful hitting the UFO of the enemy increases its speed and speed of its bullets. 
                Besides, after each successful hitting one additional object appears that can protect enemy's UFO from user's bullets.</p>
            <p>In addition to that, user should protect the planet from bullet of enemy UFO with a help of a special shield.</p>
            <p>There is a leader board in the game. User who will collect more scores gets more high rating.</p>
        </div>
        <!-- authorization -->
        <div class="authorization section">
            <h2 class="section-title">Authorization</h2>
            <div id='index-sign-options'>
                <button class="sign-up btnStyle">Sign up</button>
                <button class="sign-in btnStyle">Sign in</button>
            </div>
            <h2 class="section-title play-game">... or just enjoy the game:</h2>
            <a href="game.php"><button class="btnStyle">Play</button></a>
        </div>
    </div>

<?php
    //inserts footer into the webpage
    addFooter();
?>