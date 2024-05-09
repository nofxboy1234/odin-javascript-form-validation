function checkEmail() {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError();
  }
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
    zipcodeError.textContent = "";
    zipcodeError.className = "error";
  } else {
    showError();
  }
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
}

const form = document.querySelector("form");

const email = document.getElementById("mail");
const emailError = document.getElementById("email-error");

const zipcode = document.getElementById("zip");
const zipcodeError = document.getElementById("zipcode-error");

const country = document.getElementById("country");
const countryError = document.getElementById("country-error");

email.addEventListener("focusout", checkEmail);
country.addEventListener("change", checkZip);
zipcode.addEventListener("focusout", checkZip);

form.addEventListener("submit", (event) => {
  if (!email.validity.valid || zipcode.classList.contains("invalid")) {
    showError();
    event.preventDefault();
    return;
  }

  alert("Submit to nowhere successful!");
});
