window.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
  }

  themeToggle.addEventListener("click", toggleTheme);

  let isThemeActive = localStorage.getItem("themeActive") === "true";
  updateTheme(isThemeActive);

  function updateTheme(active) {
    themeToggle.classList.toggle("active", active);
    body.classList.toggle("dark-theme", active);
  }
});

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
  } else {
    localStorage.setItem("theme", "");
  }
}

function loginFormSubmit() {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username.trim() === "" || password.trim() === "") {
    alert("Please enter both username and password.");
    return;
  }

  if (username.length < 4) {
    alert("Username must have at least 4 characters");
    return;
  }

  if (password.length < 4) {
    alert("Password must have at least 4 characters");
    return;
  }

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        window.location.href = "home.html";
      } else {
        alert(response.message);
        window.location.href = "login.html";
      }
    }
  };

  xhr.open("POST", "login.php", true);

  xhr.send(formData);
}
