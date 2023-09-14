function validateForm() {
  const registerForm = document.getElementById("register-form");

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const username = usernameInput.value;
  const password = passwordInput.value;
  const email = emailInput.value;

  if (
    username.trim() === "" ||
    password.trim() === "" ||
    email.trim() === ""
  ) {
    alert("Please enter all required fields.");
    return false;
  }

  if (username.length < 4) {
    alert("Username must have at least 4 characters");
    return false;
  }

  if (password.length < 4) {
    alert("Password must have at least 4 characters");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        alert(response.message);
        window.location.href = "login.html";
      } else if (response.status === "error") {
        if (response.message === "Username or email already exists") {
          alert(response.message);
        } else {
          alert("Error: " + response.message);
        }
      }
    } else {
      alert("Error: " + xhr.status);
    }
  };

  xhr.open("POST", "register.php", true);

  xhr.send(formData);

  return false;
}
