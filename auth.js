function togglePassword(fieldId) {
  var field = document.getElementById(fieldId);
  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
}

var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var username = document.getElementById("loginUsername").value.trim();
    var password = document.getElementById("loginPassword").value;
    var errorMsg = document.getElementById("login-error");
    
    if (username === "" || password === "") {
      errorMsg.innerText = "All fields are required!";
      return;
    }
    
    var users = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (!users[username]) {
      errorMsg.innerText = "Username not found!";
      return;
    }
    
    if (users[username].password !== password) {
      errorMsg.innerText = "Incorrect password!";
      return;
    }
    
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  });
}

var signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("signupName").value.trim();
    var username = document.getElementById("signupUsername").value.trim();
    var email = document.getElementById("signupEmail").value.trim();
    var phone = document.getElementById("signupPhone").value.trim();
    var password = document.getElementById("signupPassword").value;
    var confirmPassword = document.getElementById("signupConfirmPassword").value;
    var errorMsg = document.getElementById("signup-error");
    
    if (name === "" || username === "" || email === "" || phone === "" || password === "") {
      errorMsg.innerText = "All fields are required!";
      return;
    }
    
    if (name.length < 2) {
      errorMsg.innerText = "Name must be at least 2 characters!";
      return;
    }
    
    if (username.length < 3) {
      errorMsg.innerText = "Username must be at least 3 characters!";
      return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errorMsg.innerText = "Username can only contain letters, numbers, and underscores!";
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMsg.innerText = "Invalid email format!";
      return;
    }
    
    if (!/^[0-9]{10,15}$/.test(phone)) {
      errorMsg.innerText = "Phone number must be 10-15 digits only!";
      return;
    }
    
    if (password.length < 6) {
      errorMsg.innerText = "Password must be at least 6 characters!";
      return;
    }
    
    if (password !== confirmPassword) {
      errorMsg.innerText = "Passwords do not match!";
      return;
    }
    
    var users = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (users[username]) {
      errorMsg.innerText = "Username already exists!";
      return;
    }
    
    users[username] = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      score: 0
    };
    
    localStorage.setItem("users", JSON.stringify(users));
    
    errorMsg.style.color = "lightgreen";
    errorMsg.innerText = "Account created! Redirecting to login...";
    
    setTimeout(function() {
      window.location.href = "login.html";
    }, 1500);
  });
}
