const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//-----------------------For get request

function loginWithGoogle() {
  window.location.href = "/api/auth/google";
}

//------------------checking for fields are completed or not
// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm");
//   const signupForm = document.getElementById("signupForm");

// loginForm.addEventListener("submit", function (event) {
//   if (!validateForm(loginForm)) {
//     event.preventDefault();
//     // Display an error message or highlight the fields to indicate that they are required
//   }
// });

// signupForm.addEventListener("submit", function (event) {
//   if (!validateForm(signupForm)) {
//     event.preventDefault();
//     // Display an error message or highlight the fields to indicate that they are required
//   }
// });

// function validateForm(form) {
//   const username = form.querySelector('input[name="username"]').value;
//   const password = form.querySelector('input[name="password"]').value;
//   if (username.trim() === "" || password.trim() === "") {
//     return false; // Return false if either username or password is empty
//   }
//   return true; // Return true if both username and password are not empty
// }
// });

// Firebase Google authentication
// async function loginWithGoogle() {
//   try {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const result = await firebase.auth().signInWithPopup(provider);
//     console.log(result);
//     alert(`Welcome ${result.user.displayName}`);
//     window.location.assign("/");
//   } catch (err) {
//     console.error(err.message);
//     alert(err.message);
//   }
// }

// // Login
// async function login() {
//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPasswordInput").value;

//   // Check if any field is left blank
//   if (!username || !password) {
//     alert("Please fill all the fields");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       let responseData = await response.json();
//       alert(`Login successful!`);
//       // Redirect to homepage after successful login
//       window.location.assign("/");
//     }
//   } catch (error) {
//     console.error("Error while logging in🥲");
//     alert("Internal Server Error");
//   }
// }

// // signup
// async function signup() {
//   const username = document.getElementById("registerUsername").value;
//   const password = document.getElementById("registerPasswordInput").value;

//   // Check if any field is left blank
//   if (!username || !password) {
//     alert("Please fill all the fields");
//     return;
//   }

//   // Check if the password length is less than 6
//   if (password.length < 6) {
//     alert("Password must be at least 6 characters long");
//     return;
//   }

//   try {
//     const response = await fetch("/signUp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const responseData = await response.json();
//       alert(`Signup successful!`);
//       // Redirect to homepage after successful login
//       window.location.assign("/");
//     }
//   } catch (error) {
//     console.error("Error while registering🥲");
//     alert(responseData.message);
//   }
// }

// // Function to handle keypress event
// function handleKeypress(event, action) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     action();
//   }
// }
// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("signupForm")
//     .addEventListener("keypress", function (event) {
//       handleKeypress(event, signup);
//     });

//   document
//     .getElementById("loginForm")
//     .addEventListener("keypress", function (event) {
//       handleKeypress(event, login);
//     });
// });

function togglePasswordVisibility(passwordInputId, passwordIconId) {
  const passwordInput = document.querySelector(`#${passwordInputId}`);
  const passwordIcon = document.getElementById(passwordIconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.classList.remove("fa-lock");
    passwordIcon.classList.add("fa-unlock");
  } else {
    passwordInput.type = "password";
    passwordIcon.classList.remove("fa-unlock");
    passwordIcon.classList.add("fa-lock");
  }
}
