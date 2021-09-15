
var questionsArray = [
    {
        question: "An array can store ______________.",
        answers: ["only strings and numbers", "strings, numbers and other arrays", "only strings",  "only numbers"],
        answer: 1,
    },

    {
        question: "In what year was JavaScript created?",
        answers: ["1995", "2003", "1989", "1981"],
        answer: 0,
    },

    {
        question: "Which method do you use to generate a random whole number?",
        answers: ["Math.random(Math.floor) * array.length", "Math.random * array.length", "random() * array.length"],
        answer: 0,
    },

    {
        question: "In what year was JavaScript created?",
        answers: ["1995", "2003", "1989", "1981"],
        answer: 2,
    },

    ];

//Quiz sections to turn off and on when needed
var startQuizContainer = document.querySelector("#startQuizContainer");
var quizContainer = document.querySelector("#quizContainer");
var endQuizContainer = document.querySelector("#endQuizContainer");
var highScoresContainer = document.querySelector("#highScoresContainer");

//Quiz textcontent modifiers
var endQuizMessage = document.querySelector("#endQuizMessage")

//Quiz buttons
var startQuizButton = document.getElementById("startQuizButton");
var nextQuestionButton = document.getElementById("nextQuestionButton");
var submitScoreButton = document.getElementById("endQuizButton");
var highScoresButton = document.getElementById("highScoreButton");

startQuizButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", nextQuestion);
submitScoreButton.addEventListener("click", submitScore);
//highScoresButton.addEventListener("click", highScores);

//answer variables
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

var answerChoices = [answer1, answer2, answer3, answer4];

//user answer function, has to be here otherwise the checkAnswer doesn't work
for (let index = 0; index < answerChoices.length; index++) {
    answerChoices[index].addEventListener("click", function() {
            userAnswer = index;
            checkAnswer(userAnswer);
})  
}

//other important variables
//timer
var timerSection = document.querySelector("#timer");

//score
var scoreSection = document.querySelector("#score");

var questionText = document.querySelector("#question");
var answerChoices = document.querySelector("#answerChoices");
var userAnswer = document.querySelector("#yourAnswer");
var score = document.querySelector("#score").value;


index = 0;

//make score variables
var score = 0;

//make timer variables
var timer = 180;

//at start of quiz (page load)
startQuizContainer.style.visibility = "visible";
quizContainer.style.visibility = "hidden";
endQuizContainer.style.visibility = "hidden";
highScoresContainer.style.visibility = "hidden";

//After start button clicked hide start content, start timer and show quiz content
function startQuiz() {
    startQuizContainer.style.visibility = "hidden";
    quizContainer.style.visibility = "visible";
    //load first question
    nextQuestion();
    //start timer
    setTimer();
}

//show a question and loop through questions when button clicked
function nextQuestion() {

    //if at end of questions
    if(index > questionsArray.length) {
        quizContainer.style.visibility = "hidden";
        endQuizContainer.style.visibility = "visible";
        endQuiz();
        
    } else {
        quizContainer.style.visibility = "visible";
        //add one to index so it displays correct number (1 instead of 0)
        questionText.innerHTML = "<h3> Question " + (index+1) + "/" + questionsArray.length + ". </h3>" + questionsArray[index].question;
        //answerChoices.textContent = questionsArray[index].answers[index];
        answer1.textContent = questionsArray[index].answers[0];
        answer2.textContent = questionsArray[index].answers[1];
        answer3.textContent = questionsArray[index].answers[2];
        answer4.textContent = questionsArray[index].answers[3];
        index++;
    }
}

function checkAnswer(userAnswer) {
    var correctAnswer = questionsArray[index].answer;

    if (userAnswer === correctAnswer) {
        console.log("correct answer")
        var message = document.createElement("p");
        message.textContent = "Correct";
        message.style.color = "green";
        question.append(message);
        score++
        scoreSection.textContent = "Score: " + score;

    }   else {
        console.log("incorrect answer")
        var message = document.createElement("p");
        message.textContent = "Incorrect";
        message.style.color = "red";
        timer = timer - 5;
        timerSection.textContent = "Time left: "+ timer;
    }
    nextQuestion();
}

/*function correctAnswer() {
    
    nextQuestion();
}

function incorrectAnswer() {
    
    nextQuestion();
}*/

//make timer function
function setTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        timerSection.textContent = "Time left: "+ timer + " seconds";

        if (timer === 1) {
            timerSection.textContent = "Time left: "+ timer + " second";
        }

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
            endQuiz();
        }

    }, 1000);
}

//run function after timer or reach end or quiz questions
function endQuiz() {
if (timer === 0) {
    endQuizMessage.innerHTML = "<h1>"+"Oh no, you ran out of time!"+"</h1>"+"<br>"+"You scored " + score + " out of " + questionsArray.length+"!";
} else {
    endQuizMessage.innerHTML = "<h1>"+"You completed the test!"+"</h1>"+"<br>"+"You scored " + score + " out of " + questionsArray.length+"!";
}
//send the user input and score to local storage
//localStorage.setItem('initials', userInitials);
//localStorage.setItem('highScore', score);
}

function submitScore(event) {
    event.preventDefault();
    var userInitials = document.querySelector("#initialsInput").value;
    if (userInitials === "") {
        alert("Please enter your initials");
    } else {
        var setScore = {
            Name: userInitials, Score: score
        }
    }
    console.log ("These are the user's " + userInitials + " and " + score);
    localStorage.setItem('highScore', JSON.stringify(setScore));
}


function highScores() {
    //show highscores window
    var getInitials = JSON.parse(localStorage.getItem("initials"));
    var getScore = localStorage.getItem("highScore");
    var highScoreText = document.querySelector("#highScoreText");

    highScoresContainer.style.visibility = "visible";
    highScoreText.textContent = getInitials + " | " + getScore;
}