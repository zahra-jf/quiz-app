let $ = document;
let signupForm = $.getElementById("signup-form");

let signupSection = $.querySelector(".signup-section");
let loginSection = $.querySelector(".login-section");

let rightSectionSignup = $.querySelector(".right-section-signup");
let leftSectionSignup = $.querySelector(".left-section-signup");

let rightSectionLogin = $.querySelector(".right-section-login");
let leftSectionLogin = $.querySelector(".left-section-login");

let btnLogin = $.querySelector(".btn-login");
let btnSignup = $.querySelector(".btn-signup");

let btnSignupSubmit = $.querySelector("btn-signup-submit");

let loginForm = $.getElementById("login-form");
let btnLoginSubmit = $.querySelector("btn-login-submit");



window.addEventListener("load", () => {
  let isLogin = getCookie("accessToken");
  if (isLogin) {
    location.href = "../htmls/select.html";
  } else {
    loginSection.style.display = "none";
    signupSection.style.display = "flex";
  }
});


btnLogin.addEventListener("click", () => {
  loginSection.style.display = "flex";
  signupSection.style.display = "none";
});

btnSignup.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "flex";
  console.log("gjfhdhd");
});

let signupName = $.getElementById("signup-name");
signupName.addEventListener("blur", () => {
  let nameValid = $.getElementById("name-valid");
  if (signupName.value.length < 1) {
    nameValid.style.display = "block";
  } else {
    nameValid.style.display = "none";
  }
});

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let email = $.getElementById("signup-email");
email.addEventListener("blur", () => {
  let emailValid = $.getElementById("email-valid");
  if (emailPattern.test(email.value) === false) {
    emailValid.style.display = "block";
  } else {
    emailValid.style.display = "none";
  }
});

let password = $.getElementById("signup-pass");
password.addEventListener("blur", () => {
  let passValid = $.getElementById("pass-valid");
  if (password.value.length < 7) {
    passValid.style.display = "block";
  } else {
    passValid.style.display = "none";
  }
});

let password_confirmations = $.getElementById("signup-confirm-pass");
password_confirmations.addEventListener("input", () => {
  let passConfirmValid = $.getElementById("confirm-pass-valid");
  if (password_confirmations.value !== password.value) {
    passConfirmValid.style.display = "block";
  } else {
    passConfirmValid.style.display = "none";
  }
});

function setCookie(name, value, days) {
  if (value) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = $.getElementById("signup-name").value;
  let email = $.getElementById("signup-email").value;
  let password = $.getElementById("signup-pass").value;
  let password_confirmation = $.getElementById("signup-confirm-pass").value;

  fetch("http://127.0.0.1:8000/api/v1/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const accessToken = response.data.accessToken;
      console.log("Access Token:", accessToken);
      if (accessToken) {
        setCookie("accessToken", accessToken, 7);
        window.location.href = "../htmls/select.html";
      } else {
        console.error("Token not received");
        // alert(data.message || 'Login failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const loginEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let loginEmail = $.getElementById("login-email");
loginEmail.addEventListener("blur", () => {
  let loginEmailValid = $.getElementById("email-valid-login");
  if (loginEmailPattern.test(loginEmail.value) === false) {
    loginEmailValid.style.display = "block";
  } else {
    loginEmailValid.style.display = "none";
  }
});

let loginPassword = $.getElementById("login-pass");
loginPassword.addEventListener("blur", () => {
  let loginPassValid = $.getElementById("pass-valid-login");
  if (loginPassword.value.length < 1) {
    loginPassValid.style.display = "block";
  } else {
    loginPassValid.style.display = "none";
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let loginEmail = $.getElementById("login-email").value;
  let loginPassword = $.getElementById("login-pass").value;

  fetch("http://127.0.0.1:8000/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const accessToken = response.data.accessToken;
      console.log("Access Token:", accessToken);
      if (accessToken) {
        setCookie("accessToken", accessToken, 7);
        window.location.href = "../htmls/select.html";
      } else {
        console.error("Token not received");
        // alert(data.message || 'Login failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // alert("error");
    });
});


function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    return null;
  }

  const accessToken = getCookie("accessToken");
  if (accessToken) {
    console.log("Access Token:", accessToken);

    fetch("http://127.0.0.1:8000/api/v1/skills", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Skills data:", response);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  } else {
    console.error("No access token found. Redirecting to login page.");
    window.location.href = "../index.html";
  }
}


// export { getCookie };