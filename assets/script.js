
var questionsArray = ["An array can store ______________.", 
                      "In what year was JavaScript created?", 
                      "How do you store a string to local storage?", 
                      "Which content insertion method is preferred for security reasons?", 
                      "Which method do you use to generate a random whole number?", 
                      "How do?",
                      "",
                      "",
                      "",
               
                    ];
//make answer array
var answersArray = [["only strings and numbers", "strings, numbers and other arrays", "only strings",  "only numbers"],
                    ["1995", "2003", "1989", "1981"], 
                    ["localStorage.setItem('example-data', exampleVariable)","localStorage.getItem('example-data', exampleVariable)","localStorage.setItem(exampleVariable)","store(exampleVariable)"], 
                    ["innerHtml","textContent"],
                    ["Math.random(Math.floor) * array.length", "Math.random * array.length", "random() * array.length"],
                    [],
                    [],
                    [],
                    ];

//list parts of page to modify here
var timerSection = document.querySelector("#timer");
var scoreSection = document.querySelector("#score");
var question = document.querySelector("#question");
var startButton = document.querySelector("#startQuiz");
var nextQuestionButton = document.querySelector("#nextQuestion");

var initialInput = document.querySelector("initials");
var finishQuizButton = document.querySelector("finishQuiz");

var formInput = document.querySelector("#formInput");

//var msgDiv = document.querySelector("#msg");

var answerChoices = document.querySelector("#answerChoices");

var userAnswer = document.querySelector("yourAnswer");

var start = document.querySelector("#start");

var score = document.querySelector("#score").value;
var initials = document.querySelector("#initials").value;

var resultsContainer = document.querySelector("#resultsContainer");
var highScoresContainer = document.querySelector("#highScoresContainer");


index = 0;

//make score variables
var score = 0;

//make timer variables
var timer = 180;

//Start Screen with test greeting and start button shown, hide all other sections
startButton.style.visibility = "visible";
resultsContainer.style.visibility = "hidden";
nextQuestionButton.style.visibility = "hidden";
highScoresContainer.style.visibility = "hidden";

//start button event listener
startButton.addEventListener("click", startQuiz);

//After start button clicked hide content, button, start timer and show quiz
function startQuiz() {
    start.style.visibility = "hidden";
    startButton.style.visibility =  "hidden";
    //load first question
    nextQuestion();
    //nextQuestionButton.style.visibility = "visible";
    setTimer();
}

//next question event listener
nextQuestionButton.addEventListener("click", nextQuestion);

//show a question and loop through questions when button clicked
function nextQuestion() {
    
    index++;
    if(index >= questionsArray.length) {
        endQuiz();
        nextQuestionButton.style.visibility = "hidden";
    } else {
        //Question is shown, user answers by typing letter into input box, answer is then checked, 
        //user clicks Next to next question
        question.textContent = "Question " + (index) + "/" + questionsArray.length + ". " + questionsArray[index];
        answerChoices.textContent = answersArray[index];
        userAnswer.style.visibility= "visible";
        nextQuestionButton.style.visibility = "visible";
        //userAnswer.textContent = "";
        //checkAnswer();
    }
}

function checkAnswer() {
    //make answer lowercase to be easier to check
    var userAnswer = document.querySelector("yourAnswer").value.toLowerCase();
    var possibleAnswers = answersArray[index];

    for (let index = 0; index < possibleAnswers.length; index++) {
        if(possibleAnswers[index].toLowerCase() == userAnswer) {
            correctAnswer();
    }   else {
        incorrectAnswer();
    }
}
}


   /* if(userAnswer===questionsArray[index]) {
        correctAnswer();
    } else {
        incorrectAnswer();
    }

    if(userAnswer==="") {
        incorrectAnswer();
    }

    if (!questionsArray[index]) {
        return;
    }
}*/

/*function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
}*/

function correctAnswer() {
    quizContainer.textContent = "Correct";
    quizContainer.style.color = "green";
    score++
    scoreSection.textContent = "Score: " + score;
}

function incorrectAnswer() {
    quizContainer.textContent = "Incorrect";
    quizContainer.style.color = "red";
    timer = timer - 5;
    timerSection.textContent = "Time left: "+ timer;
}

//make timer function
function setTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        timerSection.textContent = "Time left: "+ timer;

        if (timer <= timer/2) {
            //change timer color to orange
            timerSection.style.color = "orange";
        }

        if (timer <= 10) {
            //change timer color to red
            timerSection.style.color = "red";
        }

        //stop timer if quiz finished
        if (index >= questionsArray.length) {
            clearInterval(timerInterval);
             timerSection.textContent = "Time: " + timer;
            endQuiz();
        }

        //when timer reaches 0 end game and save player score
        if (timer === 0) {
            clearInterval(timerInterval);
            timerSection.textContent = "Time's up";
            endQuiz();
        }

    }, 1000);
}

//finishQuizButton.addEventListener("click", storeResults);

//run function after timer or reach end or quiz questions
function endQuiz() {
    quizContainer.style.visibility = "hidden";
    resultsContainer.style.visibility = "visible";
    highScoresContainer.style.visibility = "hidden";
    timerSection.textContent = "Test completed";
    //formInput.textContent = "You scored " + score + " out of " + questionsArray.length;
    //finishQuizButton.style.visibility = "visible";
    storeResults();
}

function storeResults() {
    highScoresContainer.style.visibility = "visible";
    //resultsContainer.style.visibility = "hidden";
    var inputInitials = document.querySelector("initials");
    var highScore = score;
    //if (inputInitials ==="") {
     //   displayMessage("Error: Initials cannot be blank");
    //} else {
    localStorage.setItem("initials", inputInitials);
    localStorage.setItem("highScore", highScore);
    //}
}

function showResults() {
    var getInitials = localStorage.getItem("initials", inputInitials);
    var getScore = localStorage.getItem("highScore", highScore);
    //question.textContent = getInitials + " | " + getScore;
    return getInitials, getScore;
}




