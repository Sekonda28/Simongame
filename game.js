var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//function to randomly select a colour, make it flash and play audio clip

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$("body").one("keydown", function () {
  nextSequence();
  $("h1").text("Level " + level);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text(
      "Game over! You got to Level " + level + ". Press F5 to play again"
    );
  }
}
