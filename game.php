<?php
    //connects common.php to the page
    include('common.php');

    //inserts the head of the html document into the page
    addHtmlHead();

    //inserts the header with logo, the name of the website and signIn/signUp buttons into the webpage
    addPageHeader();

    //inserts the navigation bar into the webpage
    addNavBar("Game");
?>

    <!-- the main content -->
    <div class="content">

<?php
    //inserts registration form
    addRegistrationForm();

    //inserts login form
    addLoginForm();
?>

        <h1>It is time to play!</h1>
        <div class="game-section">
            <div id="your-scores">
                <h3>Your Score: <span id="score-value"></span></h3>
            </div>
            <div id="attempts">
                <h3>Attempts: <span id="attempts-value"></span></h3>
            </div>
            <div id="best-scores">
                <h3>Best Score: <span></span></h3>
            </div>
            <div id="hits">
                <h3>Hits: <span></span></h3>
            </div>
            <div class="addLogo opened"></div>
            <div class="start-message opened">
                <h3>Press "New game" to start</h3>
            </div>
            <canvas id="game">
                <img id="background-image" src="static/images/gameBackground.png">
                <img id="user-ufo" src="static/images/ufo.png">
                <img id="enemy-ufo" src="static/images/enemy.png">
                <img id="shield" src="static/images/shield.png">
                Please, update your browser.
            </canvas>
            <button id="btnNewGame" class="btnStyle btnActive">New game</button>
            <button id="btnReset" class="btnStyle">Reset</button>
        </div>
    </div>

<?php
    //inserts footer into the webpage
    addFooter("game");
?>