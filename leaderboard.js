var currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function showLeaderboard() {
  var users = JSON.parse(localStorage.getItem("users") || "{}");
  var scores = [];
  
  for (var username in users) {
    if (users[username].score > 0) {
      scores.push({
        name: users[username].name,
        username: username,
        score: users[username].score
      });
    }
  }
  
  scores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  var list = document.getElementById("score-list");
  list.innerHTML = "";
  
  for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    var rank = i + 1;
    var medal = "";
    if (rank === 1) medal = "🥇 ";
    else if (rank === 2) medal = "🥈 ";
    else if (rank === 3) medal = "🥉 ";
    
    li.innerText = medal + scores[i].name + " (@" + scores[i].username + "): " + scores[i].score;
    
    if (scores[i].username === currentUser) {
      li.style.backgroundColor = "rgba(81, 207, 102, 0.3)";
      li.style.fontWeight = "bold";
    }
    
    list.appendChild(li);
  }
  
  if (scores.length === 0) {
    list.innerHTML = "<li>No scores yet! Be the first to play!</li>";
  }
}

showLeaderboard();
