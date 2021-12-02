//create variable for DOM element
let leaderTable = document.getElementById("leader-table");
//an array of all leaders
let leaders = [];
//fills the leaders array with objects from local storage
for (let i = 0; i < localStorage.length; i++) {
    let email = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(email));
    leaders.push(user);
}
//sorts leaders array in reverse order
for (let i = 0; i < leaders.length; i++) {
    for (let j = leaders.length - 1; j > i; j--) {
        if (leaders[j].bestResult > leaders[i].bestResult) {
            let temp = leaders[i];
            leaders[i] = leaders[j];
            leaders[j] = temp;
        }
    }
}
//displays all leaders in the leader table
for (let i = 0; i < leaders.length; i++) {
    leaderTable.innerHTML += "<tr><td>" + leaders[i].username + "</td><td>" + leaders[i].bestResult + "</td></tr>";
}
