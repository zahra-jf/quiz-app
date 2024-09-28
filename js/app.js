let $ = document;

let signupSection = $.querySelector(".signup-section");
let loginSection = $.querySelector(".login-section");

let rightSectionSignup = $.querySelector(".right-section-signup");
let leftSectionSignup = $.querySelector(".left-section-signup");

let rightSectionLogin = $.querySelector(".right-section-login");
let leftSectionLogin = $.querySelector(".left-section-login");


let btnLogin = $.querySelector(".btn-login");
let btnSignup = $.querySelector(".btn-signup");
let btnLoginSubmit = $.querySelector("btn-login-submit");
let btnSignupSubmit = $.querySelector("btn-signup-submit");



window.addEventListener("load", () => {
  loginSection.style.display="none"
    signupSection.style.display = "flex";
    // rightSection.style.cssText = " background-color: var(--clr-dark)"; 
});


btnLogin.addEventListener("click", () => {
   loginSection.style.display = "flex";
    signupSection.style.display = "none";
  // rightSection.style.cssText = " background-color: var(--clr-light)";

});


btnSignup.addEventListener("click", () => {
   loginSection.style.display = "none";
   signupSection.style.display = "flex";
 console.log("gjfhdhd");
});


// btnLoginSubmit.addEventListener()

// btnSignupSubmit.addEventListener()