function printHighScores() {
    //either get scores from local storage  or set to empty array
    var highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // sort highscores by score property in decending order
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });


    highScores.forEach(function(score) {
        // creat li tag for each high score
        var liTag = document.createElement('li');
        liTag.textContent = score.initials + " - " + score.score;

        //display on page
        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighScores;

//run function whenpage loads
printHighScores();