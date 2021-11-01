<?php
    //connects common.php to the page
    include('common.php');

    //inserts the head of the html document into the page
    addHtmlHead("About us");

    //inserts the header with logo, the name of the website and signIn/signUp buttons into the webpage
    addPageHeader();

    //inserts the navigation bar into the webpage
    addNavBar("About us");
?>

    <!-- the main content -->
    <div class="content">

<?php
    //inserts registration form
    addRegistrationForm();

    //inserts login form
    addLoginForm();
?>

        <h1>About us!</h1>
        <!-- game description -->
        <div class="description section">
            <h2 class="section-title">About the project:</h2>
            <p>This project is created for entertainment purposes only and 
                it does not carry any semantic load.
            </p>
            <p>If you:</p> 
            <ul>
                <li>like it;</li>
                <li>want to leave a feedback;</li>
                <li>want to participate and make this project even more better.</li>
            </ul> 
            <p>please, do not hesitate and let us know using contacts below.</p>  
        </div>
        <!-- goals of the game -->
        <div class="description section">
            <h2 class="section-title">Contacts:</h2>
            <p style="padding-left: 20%;"><b>email:</b> <span style="padding-left: 10%;">ufowars@example.com</span></p>
            <p style="padding-left: 20%; margin-bottom: 5vh;"><b>phone:</b> <span style="padding-left: 10%;">+1 (234) 567-89-01</span></p>   
        </div>
    </div>   

<?php
    //inserts footer into the webpage
    addFooter();
?>