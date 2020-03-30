//1: create relatable variables to build with
var viewHighscores = document.querySelector("body > ul > li > a");
var secondsLeft = document.querySelector(".seconds");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var quizContainer = document.querySelector("#card");
var questionNumber = document.querySelector("#question-number");
// Setting timer 
var sec = 75;


//Setting the currentQIndex to begin at 0
var currentQuestionIndex = 0;
//Declare the timer as a global scope to access in and outside of functions
var timerId;

//2: A function that clears the current window to begin the quiz and initiate timer. I attempted a slideshow but hide command works easier
    function renderQuiz () {
      var quizArea = document.querySelector("#card > div > p")
      quizArea.setAttribute("class", "hide");
      startBtn.setAttribute("class", "hide");
      questionNumber.setAttribute("class", "hide");
      questionsEl.removeAttribute("class");
//3: nest functioning timer to start of quiz
      timerId = setInterval(timer, 1000);

      secondsLeft.textContent = sec;
      retrieveQues();
    }

    //a: create a function that reveals the quiz questions in a forEach loop,
    function retrieveQues () {
      var currentQuestion = myQuestions[currentQuestionIndex];
      var titleEl = document.querySelector("#question-header");
      titleEl.textContent = currentQuestion.title;
      choicesEl.innerHTML = "";

      // Made a loop for the choices, at first I had a for loop, but had trouble getting that to work correctly. Because I was able to put the Index of myQuestions into a usable var, I can call back the "choice" event for the loop
      currentQuestion.choices.forEach(function(choice) {

        // creates a new button for each choice with their corresponding value
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.setAttribute("class", "choicebtn");
        
        //sets the choices in each button for the corresponding question
        choiceBtn.textContent = choice;

        // Add a click event to start a function that checks the matching selected value and moves on to the next question
        choiceBtn.onclick = questionCheck;
        choicesEl.appendChild(choiceBtn);
      });
    }

    
//4: Add a function that advances the question while keeping track of the timer
    function questionCheck () {

      //'this' refers to the upmost scope where it is defined, in this case it is used as an object method to bind .value to CurrentQuestionIndex if the answer doesnt match with the value, deduct 15 seconds
      if (this.value !== myQuestions[currentQuestionIndex].answer) {
        sec -= 15;

        if (sec < 0) {
          sec = 0;
        }
        secondsLeft.textContent = sec;
      }  

      // Advance to the next question     
        currentQuestionIndex ++;

        // if the quiz length exceeds the amount of remaining questions, end the quiz, else , retreive the next question!
        if (currentQuestionIndex === myQuestions.length) {
          quizEnd();
        } else {
          retrieveQues();
        }
    }

    //5: Trigger the end of the quiz by clearing the timer and combining the final tally with the outcome of the timer
    function quizEnd () {
      var gameOverEl = document.querySelector("#gameOver");
      var finalScoreEl = document.querySelector("#finalScore");

      clearInterval(timerId);

      gameOverEl.removeAttribute("class");
      finalScoreEl.textContent = sec;
      questionsEl.setAttribute("class", "hide");
    }

    //6: a functioning timer
    function timer () {
      sec--;
      secondsLeft.textContent = sec;

      if (sec <= 0) {
        quizEnd();
      }
    }
    
//Click event for the "Start Quiz" button
startBtn.onclick = renderQuiz;






