document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const regNo = document.getElementById("regNo").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  const btn = document.getElementById("btn");
  btn.addEventListener('click',()=>{
	  window.location.href="dashboard.html"
  })
  errorMessage.innerText = "";

  const storedUser = JSON.parse(localStorage.getItem(username));

  if (!storedUser) {
    errorMessage.innerText = "User not found. Please register first.";
    return;
  }

  if (
    storedUser.regNo === regNo &&
    storedUser.username === username &&
    storedUser.password === password
  ) {
    // Save logged in user as current session
    localStorage.setItem("currentUser", JSON.stringify(storedUser));

    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    errorMessage.innerText = "Invalid credentials. Please try again.";
  }
});

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type");
  passwordInput.setAttribute("type", type === "password" ? "text" : "password");
  this.innerText = type === "password" ? "Hide" : "Show";
});