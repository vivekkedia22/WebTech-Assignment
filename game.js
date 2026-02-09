var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var playerName = "";
var bestScore = 0;

showLeaderboard();

var form = document.getElementById("nameForm");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  var nameInput = document.getElementById("playerName").value;
  var errorMsg = document.getElementById("error-msg");
  
  if (nameInput.trim() === "") {
    errorMsg.innerText = "Name cannot be empty!";
    return;
  }
  
  if (nameInput.length < 2) {
    errorMsg.innerText = "Name must be at least 2 characters!";
    return;
  }
  
  playerName = nameInput;
  document.getElementById("player-form").classList.add("hidden");
  
  var saved = localStorage.getItem(playerName);
  if (saved) {
    bestScore = parseInt(saved);
  }
  
  updatePlayerInfo();
});

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
      localStorage.setItem(playerName, bestScore);
      showLeaderboard();
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

function showLeaderboard() {
  var scores = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = parseInt(localStorage.getItem(key));
    if (!isNaN(value)) {
      scores.push({name: key, score: value});
    }
  }
  
  scores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var list = document.getElementById("score-list");
  list.innerHTML = "";
  
  for (var i = 0; i < Math.min(5, scores.length); i++) {
    var li = document.createElement("li");
    li.innerText = scores[i].name + ": " + scores[i].score;
    list.appendChild(li);
  }
  
  if (scores.length === 0) {
    list.innerHTML = "<li>No scores yet!</li>";
  }
}
