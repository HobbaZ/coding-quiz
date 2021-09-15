
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
        answers: ["Math.random(Math.floor) % array.length", "Math.random * array.length", "Math.random(Math.floor) * array.length", "randomWholeNumber * array.length"],
        answer: 2,
    },

    {
        question: "What is the or operator in Javascript?",
        answers: ["&&", "**", "||", "%"],
        answer: 2,
    },

    {
        question: "How do you create a function in Javascript?",
        answers: ["function myFunction{}", "function = myFunction()", "myFunction function()", "function myFunction()"],
        answer: 3,
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
submitScoreButton.addEventListener("click", submitScore);
highScoresButton.addEventListener("click", displayHighScores);

//answer variables
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answerChoices = [answer1, answer2, answer3, answer4];

//user answer function
for (let j = 0; j < answerChoices.length; j++) {
    answerChoices[j].addEventListener("click", function() {
            userAnswer = j;
            checkAnswer(userAnswer);
})  
}

//other important variables
var timerSection = document.querySelector("#timer");
var scoreSection = document.querySelector("#score");
var questionText = document.querySelector("#question");
var answerChoices = document.querySelector("#answerChoices");
var userAnswer = document.querySelector("#yourAnswer");
var score = document.querySelector("#score").value;
var score = 0;
var timer = 180;
var currentQuestion = 0;

//at start of quiz (page load)
startQuizContainer.style.display = "block";
quizContainer.style.display = "none";
endQuizContainer.style.display = "none";
highScoresContainer.style.display = "none";

//After start button clicked hide start content, start timer and show quiz content
function startQuiz() {
    startQuizContainer.style.display = "none";
    quizContainer.style.display = "block";
    highScoresContainer.style.display = "none";
    //load first question
    nextQuestion();
    //start timer
    setTimer();
}

//show a question and loop through questions when button clicked
function nextQuestion() {
    //if at end of questions
    if(currentQuestion >= questionsArray.length) {
        quizContainer.style.display = "none";
        endQuizContainer.style.display = "block";
        endQuiz();
        
    } else {
        quizContainer.style.display = "block";
        //add one to currentQuestion so it displays correct number (1 instead of 0)
        questionText.innerHTML = "<h3> Question " + (currentQuestion+1) + "/" + questionsArray.length + ". </h3>" + questionsArray[currentQuestion].question;

        answer1.textContent = questionsArray[currentQuestion].answers[0];
        answer2.textContent = questionsArray[currentQuestion].answers[1];
        answer3.textContent = questionsArray[currentQuestion].answers[2];
        answer4.textContent = questionsArray[currentQuestion].answers[3];
        currentQuestion++;
    }
}

function checkAnswer(userAnswer) {
    //put currentQuestion minus 1 otherwise answer is ahead of questions
    var correctAnswer = questionsArray[currentQuestion-1].answer;
    
    if (userAnswer === correctAnswer) {
        var message = document.createElement("p");
        message.textContent = "Correct +1";
        message.style.color = "green";
        question.append(message);
        score++
        scoreSection.textContent = "Score: " + score;
        

    }   else {
        console.log("correctAnswer");
        var message = document.createElement("p");
        message.textContent = "Incorrect, the correct answer was " + correctAnswer;
        message.style.color = "red";
        question.append(message);
        timer = timer - 10;
        timerSection.textContent = "Time left: "+ timer;
    }
    //waits one second to go to next question
    setTimeout(function() {
        nextQuestion();   
    }, 1000);
}

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
        if (currentQuestion >= questionsArray.length) {
            clearInterval(timerInterval);
             timerSection.textContent = "Time: " + timer;
            endQuiz();
        }

        //when timer reaches 0 end game and save player score
        if (timer === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 500);
}

//run function after timer runs out or reach end of quiz questions
function endQuiz() {
if (timer === 0) {
    endQuizMessage.innerHTML = "<h1>"+"Oh no, you ran out of time!"+"</h1>"+"<br>"+"You scored " + score + " out of " + questionsArray.length+"!";
} else {
    endQuizMessage.innerHTML = "<h1>"+"You completed the test!"+"</h1>"+"<br>"+"You scored " + score + " out of " + questionsArray.length+"!";
}
}

function submitScore(event) {
    event.preventDefault();
    var userInitials = document.querySelector("#initialsInput").value;
    var message = document.createElement("p");

    if (userInitials === "") {
        message.textContent = "Please enter your initials";
        message.style.color = "red";
        //endQuizMessage.append(message);
    } else {
        var setScore = {
            Name: userInitials, Score: score
        }
        message.textContent = "Your score has been saved, you will now be returned to the quiz start page";
        message.style.color = "green";
        
        var highScore = localStorage.getItem("highScore");

        if (highScore || score > parseInt(highScore)) {
                localStorage.setItem('highScore', JSON.stringify(setScore));
                console.log(highScore);
        }
        //waits one second to reset the quiz
        setTimeout(function() {
            endQuizContainer.style.display = "none";
            startQuizContainer.style.display = "block";   
        }, 1500);
    }
    endQuizMessage.append(message);
}

function displayHighScores() {
    //show highscores window
    if (localStorage.getItem('highScore')) {
    var getScore = (localStorage.getItem("highScore"));
        highScoreText.innerHTML = getScore;
    } else {
        var getScore = "";
        highScoreText.innerHTML = "No high scores here yet, be the first!"
    }
    highScoresContainer.style.display = "block";
}