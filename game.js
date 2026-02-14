var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var playerName = "";
var currentUsername = "";
var bestScore = 0;

var currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
} else {
  var users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[currentUser]) {
    currentUsername = currentUser;
    playerName = users[currentUser].name;
    bestScore = users[currentUser].score || 0;
    updatePlayerInfo();
  } else {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

document.addEventListener("keypress", function () {
  if (!started && playerName !== "") {
    document.getElementById("level-title").innerText = "Level " + level;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function () {

    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    if (level > bestScore) {
      bestScore = level;
      var users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[currentUsername]) {
        users[currentUsername].score = bestScore;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    document.getElementById("level-title").innerText =
      "Game Over, Press Any Key to Restart";
    
    updatePlayerInfo();

    started = false;
    level = 0;
    gamePattern = [];
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerText = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var button = document.getElementById(randomChosenColour);

  button.style.opacity = "0";
  setTimeout(() => button.style.opacity = "1", 100);
  setTimeout(() => button.style.opacity = "0", 200);
  setTimeout(() => button.style.opacity = "1", 300);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}

function updatePlayerInfo() {
  var info = "Player: " + playerName + " | Best: " + bestScore;
  document.getElementById("player-info").innerText = info;
}
