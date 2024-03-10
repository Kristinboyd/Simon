//variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//functions
//detect when any key is pressed to begin the game and show level
$(document).keydown(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

//detect when any of the buttons are clicked and trigger a handler function.
$('.btn').click(function() {
  //UserChosenColor to store the id of the button that got clicked.
  var userChosenColor = $(this).attr('id');

  //Add userChosenColor to end of userClickedPattern
  userClickedPattern.push(userChosenColor);

  //play the sound and animation
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //check the pattern
  checkAnswer(userClickedPattern.length-1);
});

//function to check the answer of the pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//function that generates a random gamePattern
function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);

  //generates a num between 0.0 and 0.9999999
  var randomNumber = Math.random();

  //multiply that number by the max num we want
  randomNumber = randomNumber * 3;

  //round that num to the nearest floor and add one to account for the 0th index
  randomNumber = Math.floor(randomNumber) + 1;

  //chose a random color using the new randomNumber
  var randomChosenColor = buttonColors[randomNumber];

  //push that random color onto the gamePattern array
  gamePattern.push(randomChosenColor);

  //select the button with the same id as randomChosenColor
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound for the current button color
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  playSound(randomChosenColor)
}

//function to animate the click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//funciton to play the sound on click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to start the game over
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
