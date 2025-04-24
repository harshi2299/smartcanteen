document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const regNo = document.getElementById("regNo").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("success-message");
  const btn = document.getElementById("btn");
  btn.addEventListener('click',()=>{
	  window.location.href="dashboard.html"
  })

  message.style.color = "red";
  message.innerText = "";

  // Check if username already exists
  if (localStorage.getItem(username)) {
    message.innerText = "Username already exists. Please choose another.";
    return;
  }

  // Save to localStorage
  localStorage.setItem(
    username,
    JSON.stringify({ regNo, fullName, username, password })
  );

  message.style.color = "green";
  message.innerText = "Account created! Your username is `${username}`";

  document.getElementById("registerForm").reset();
});