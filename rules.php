<?php
    //connects common.php to the page
    include('common.php');

    //inserts the head of the html document into the page
    addHtmlHead("rules");

    //inserts the header with logo, the name of the website and signIn/signUp buttons into the webpage
    addPageHeader();

    //inserts the navigation bar into the webpage
    addNavBar("How to play");
?>

    <!-- the main content -->
    <div class="content">

<?php
    //inserts registration form
    addRegistrationForm();

    //inserts login form
    addLoginForm();
?>

        <h1>How to play!</h1>
        <!-- game description -->
        <div class="description section">
            <h2 class="section-title">Game:</h2>
            <p>You have 3 attempts and should hit the enemy UFO 3 times to kill it.
                After each successful hitting the UFO of the enemy increases its speed and speed 
                of its bullets. Besides, after each successful hitting one additional object appears 
                that can protect enemy's UFO from uesr's bullets.
            </p>
            <p>In addition to that, you should protect the planet from bullets of enemy UFO with a help 
                of a special shield.
            </p>    
        </div>
        <!-- goals of the game -->
        <div class="description section">
            <h2 class="section-title">Goal of the game:</h2>
            <p>You should kill UFO of enemy and collect more scores.</p>
            <p>There is a leader board in the game. User who will collect more scores gets more high rating.</p>    
        </div>
        <!-- controls -->
        <div class="description section">
            <h2 class="section-title">Control:</h2>
            <table>
                <tr>
                    <th class="bold" colspan="2">UFO</th>
                    <th class="bold" colspan="2">Shield</th>
                </tr>
                <tr>
                    <td>Move to the right:</td>
                    <td class="bold">D</td>
                    <td>Move to the right:</td>
                    <td class="bold">RIGHT</td>
                </tr>
                <tr>
                    <td>Move to the left:</td>
                    <td class="bold">S</td>
                    <td>Move to the left:</td>
                    <td class="bold">LEFT</td>
                </tr>
                <tr>
                    <td>Strike:</td>
                    <td class="bold">SPACE</td>
                </tr>
            </table>  
        </div>
        <!-- scores -->
        <div class="description section">
            <h2 class="section-title">Scores:</h2>
            <table>
                <tr>
                    <td>Catch a bullet with a shield:</td>
                    <td class="bold">+1</td>
                    <td>your planet is hit:</td>
                    <td class="bold">-15</td>
                </tr>
                <tr>
                    <td>The first hit:</td>
                    <td class="bold">+20</td>
                    <td>You missed a hit:</td>
                    <td class="bold">-10 and -1 attempt</td>
                </tr>
                <tr>
                    <td>The second hit:</td>
                    <td class="bold">+50</td>
                </tr>
                <tr>
                    <td>The third hit:</td>
                    <td class="bold">+100</td>
                </tr>
            </table>  
        </div>
    </div>

<?php
    //inserts footer into the webpage
    addFooter();
?>