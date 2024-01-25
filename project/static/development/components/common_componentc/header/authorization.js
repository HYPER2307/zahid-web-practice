import { validationBtn } from "../../module/validation";

validationBtn(".sign-in__form");
validationBtn(".registration__form");

const signInForm = document.querySelector(".sign-in__form");
const registrationForm = document.querySelector(".registration__form");
const signInFormRegBtn = signInForm.querySelector(".sign-in__form-reg-btn");
const registrationFormLoginBtn = registrationForm.querySelector(
  ".registration__form-login-btn"
);
const allAuthorizationBtns = document.querySelectorAll(".authorization-btn");

allAuthorizationBtns.forEach((item) =>
  item.addEventListener("click", (e) => e.preventDefault())
);

signInFormRegBtn.addEventListener("click", () => {
  signInForm.classList.add("disabled");
  registrationForm.classList.add("active");
});

registrationFormLoginBtn.addEventListener("click", () => {
  signInForm.classList.remove("disabled");
  registrationForm.classList.remove("active");
});
