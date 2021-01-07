// variables to refrence Dom elements
var timerEl =document.getElementById("time");
var startButton =document.getElementById("startBtn");
var questionsEl =document.getElementById("questions");
var choicesEl =document.getElementById("choices");
var submitBtn =document.getElementById("submit");
var initialEl =document.getElementById("initials");
var feedbackEl =document.getElementById("feedback");


//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId; 


// sound effects
var sfxRight = new Audio("sfx copy/correct.wav");
var sfxWrong = new Audio("sfx copy/incorrect.wav");



function startQuiz(){
    // Hidding the start screen
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');


    //un-hidding the questions
    questionsEl.removeAttribute('class');

    // starting timer
    timerId = setInterval(clockTick, 1000);
    

    // showing the timer
    timerEl.textContent = time;

    getQuestion();
}


function getQuestion() {
   //get current question object from array
   var currentQuestion = questions[currentQuestionIndex];


 // update title with current question
 var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;


 // clear out any old question choices
 choicesEl.innerHTML = " ";


   //loop the choices
   currentQuestion.choices.forEach(function(choice, i) { 

    //creating button for each choice
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    //attach click event listener to each choice 
    choiceNode.onclick = questionClick;


    //display on the page
    choicesEl.appendChild(choiceNode);

   });
}


function questionClick() {
    //check what the user guessed. wrong or right
    if (this.value !== questions[currentQuestionIndex].answer) {
        //penalize time
        time -= 15;

        if(time < 0) {
            time = 0;
        }

        // display the time on page
        timerEl.textContent = time;

        //play wrong sound effect
        sfxWrong.play();

        feedbackEl.textContent= "wrong!";
    } else {
        sfxRight.play();

        feedbackEl.textContent = "Correct!";
    }


    // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");

  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  
  currentQuestionIndex++;


    //check if all questions are asked
    if (currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        getQuestion();
      }
    
}



function quizEnd() {

    clearInterval(timerId);

    //show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');


    //show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;


    //hide question section
    questionsEl.setAttribute('class', 'hide');

}

function clockTick() {
    // time update
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighScore() {
    //getting the value of input box
    var initials = initialEl.value.trim();

    if(initials !== "") {
        //getting saved scores from local storage, or if not any, set to empty array
        var highScores = 
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        //format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };


        // save to local storage
        highScores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highScores));

        //redirect to local storage
        window.location.href = 'highscore.html';
    }
}


function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighScore();
    }
  }
 
//user click button to submit initials
submitBtn.onclick = saveHighScore;

//user clicks button to start quiz
startButton.onclick = startQuiz;

initialEl.onkeyup = checkForEnter;
