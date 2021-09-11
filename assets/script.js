

//make question array
var questions = ["What is an array", "How do you store a string to local storage", "which option below will change a html directly"];

//make answer array
var answers = [];

//list parts of page to modify here
var timerSection = document.querySelector("#timer");
var scoreSection = document.querySelector("#score");
var quizContainer = document.querySelector("#quizContainer");
var questionSection = document.querySelector("#question");
var startButton = document.querySelector("#startQuiz");
var nextQ = document.querySelector("#nextQuestion");
var initialInput = document.querySelector("user-initials");
var finishButton = document.querySelector("finishQuiz");
var msgDiv = document.querySelector("#msg");

var initials = localStorage.getItem("initials");
var highScore = localStorage.getItem("highScore");
var resultsContainer = document.querySelector("#resultsContainer");

//make score variables
var score = 0;

//make timer variables
var timer = 60;

var questionAmount = 10;

function showQuestions(questions, quizContainer) {

}

function showResults(questions, quizContainer, resultsContainer) {

}

showQuestions(questions, quizContainer);

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
}

function correctAnswer() {
    questionSection.textContent = "Correct";
    questionSection.style.color = "green";
    score++
    scoreSection.textContent = "Score: " + score;
}

function incorrectAnswer() {
    questionSection.textContent = "Incorrect";
    questionSection.style.color = "red";
    timer = timer - 5;
    timerSection.textContent = "Time left: "+ timer;
}

function nextQuestion() {
    var questionAmount= 0;
    var currentQuestion = questions[index];
    for (let index = 0; index < questions.length; index++) {
        questions[index];
        currentQuestion = questions[index]++;
        questionAmount++;
        
        questionSection.textContent = questionAmount + " / " + questions.length + "<br>" + "<hr>" + questions[index];
    }
    return currentQuestion;
}

function startQuiz() {
    quizContainer.style.visibility = "visible";
    resultsContainer.style.visibility = "hidden";
    startButton.style.visibility =  "hidden";
    setTimer();
}

function results(questions, quizContainer, resultsContainer) {
    var answerContainers = quizContainer.querySelectorAll(".answers");

    var userAnswer = "";

    //for each question
    for (let i = 0; i < questions.length; i++) {
        userAnswer = (answerContainers[i].querySelector("input[name=question"));

        if(userAnswer===questions[i].answer) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
}

//start button event listener
startButton.addEventListener("click", startQuiz);

//next question event listener
nextQ.addEventListener("click", nextQuestion);

//Finish quiz event listener


//make timer function
function setTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        timerSection.textContent = "Time left: "+ timer;

        if (timer <= 30) {
            //change timer color to orange
            timerSection.style.color = "orange";
        }

        if (timer <= 10) {
            //change timer color to red
            timerSection.style.color = "red";
        }

        if (timer === 0) {
            //when timer reaches 0 end game and save player score
            clearInterval(timerInterval);
            timerSection.textContent = "Time's up";
            endGame();
        }

    }, 1000);
}

finishButton.addEventListener("click", function(event) {
    event.preventDefault();
    var score = document.querySelector("#score").value;
    var initials = document.querySelector("#initials").value;

    if (initials ==="") {
        displayMessage("Error: Initials cannot be blank");
    } else {
    localStorage.setItem("initials", initials);
    localStorage.setItem("highScore", score);
    }
});

function endGame() {
    quizContainer.style.visibility = "hidden";
    resultsContainer.style.visibility = "visible";
    resultsContainer.textContent = "You scored " + score + "out of " + questions.length;
}
