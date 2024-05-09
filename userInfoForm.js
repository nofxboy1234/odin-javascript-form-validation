function checkEmail() {
  if (email.validity.valid) {
    resetError(emailError);
  } else {
    showError();
  }
}

function resetError(error) {
  error.textContent = "";
  error.className = "error";
}

function checkZip() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland zips must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France zips must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany zips must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherlands zips must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(zipcode.value)) {
    zipcode.classList.remove("invalid");
    zipcode.classList.add("valid");
    resetError(zipcodeError);
  } else {
    showError();
  }
}

function checkPassword() {
  const pattern = "^(CH-)?\\d{4}$";
  const constraint = new RegExp(pattern, "");

  if (constraint.test(password.value)) {
    password.classList.remove("invalid");
    password.classList.add("valid");
    resetError(passwordError);
  } else {
    showError();
  }
}

function checkPasswordConfirm() {
  //
}

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Email address is required";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Value needs to be a valid email address";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters. You entered ${email.value.length}.`;
  }

  emailError.className = "error active";

  zipcode.classList.add("invalid");
  zipcode.classList.remove("valid");
  zipcodeError.textContent = `Zipcode is not valid for ${
    country.item(country.selectedIndex).textContent
  }`;
  zipcodeError.className = "error active";

  password.classList.add("invalid");
  password.classList.remove("valid");
  passwordError.textContent = "Password is not valid";
  passwordError.className = "error active";
}

const form = document.querySelector("form");

const email = document.getElementById("mail");
const emailError = document.getElementById("email-error");

const zipcode = document.getElementById("zip");
const zipcodeError = document.getElementById("zipcode-error");

const country = document.getElementById("country");

const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmError = document.getElementById("password-confirm-error");

email.addEventListener("focusout", checkEmail);
country.addEventListener("change", checkZip);
zipcode.addEventListener("focusout", checkZip);

form.addEventListener("submit", (event) => {
  if (
    !email.validity.valid ||
    zipcode.classList.contains("invalid") ||
    password.classList.contains("invalid")
  ) {
    showError();
    event.preventDefault();
    return;
  }

  alert("Submit to nowhere successful!");
});

password.addEventListener("focusout", checkPassword);
passwordConfirm.addEventListener("focusout", checkPasswordConfirm);
