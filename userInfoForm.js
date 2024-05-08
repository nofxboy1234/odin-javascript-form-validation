const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector(".error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError();
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    showError();
    event.preventDefault();
    return;
  }

  alert("Submit to nowhere successful!");
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Email address is required";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Value needs to be a valid email address";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters. You entered ${email.value.length}.`;
  }

  emailError.className = "error active";
}
