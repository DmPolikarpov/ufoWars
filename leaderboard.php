<?php
    //connects common.php to the page
    include('common.php');

    //inserts the head of the html document into the page
    addHtmlHead("leaderboard");

    //inserts the header with logo, the name of the website and signIn/signUp buttons into the webpage
    addPageHeader();

    //inserts the navigation bar into the webpage
    addNavBar("Leader board");
?>

    <!-- the main content -->
    <div class="content">

<?php
    //inserts registration form
    addRegistrationForm();

    //inserts login form
    addLoginForm();
?>

        <h1>Leader Board</h1>
        <div class="description section">
            <table>
                <tr>
                    <th>Username</th>
                    <th>Scores</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div> 

<?php
    //inserts footer into the webpage
    addFooter();
?>