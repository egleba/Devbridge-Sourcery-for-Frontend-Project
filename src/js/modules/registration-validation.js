/* eslint-disable */
const privacyCheckbox = document.querySelector(".checkbox");
const submitButton = document.querySelector(".application-form__button");
const typeError = document.querySelector(".academy-type__error-text");
const typeCheckboxes = document.querySelectorAll(".academy-type__input");
const cityInputs = document.querySelectorAll(".radio__input");
const cityError = document.querySelector(".radio__error-text");
const textInputs = document.querySelectorAll(".js-form__input");
const emailInput = document.querySelector("#email");
const fileInput = document.querySelector(".file-input__input");
const fileInputLabel = document.querySelector(".file-input__label");
const fileError = document.querySelector(".file-input__error-text");
const fileInputFieldTextContent = document.querySelector(
  ".file-input__content"
);
const fileInputButton = document.querySelector(".file-input__button");
const fileInputIcon = document.querySelector(".file-input__icon--add");
const fileInputIconClear = document.querySelector(".file-input__icon--clear");
const allowedExtensions = /(\.pdf)$/i;

// Enabling Submit button only when Privacy is checked
if (document.querySelector(".application-form") !== null) {
  privacyCheckbox.addEventListener("change", () => {
    privacyCheckbox.checked
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  });
}

if (document.querySelector(".application-form") !== null) {
  submitButton.addEventListener("click", event => {
    event.preventDefault();
    // The order is inverted so that element highest in DOM tree that can error is checked last and is the one that's scrolled into view:
    checkFileOnSubmit();
    checkFileOnChange();
    checkTextsOnSubmit();
    checkTextsOnChange();
    checkCityOnSubmit();
    checkCityOnChange();
    checkTypeOnSubmit();
    checkTypeOnChange();

    if (
      checkTypeOnSubmit() &&
      checkCityOnSubmit() &&
      checkTextsOnSubmit() &&
      checkFileOnSubmit()
    ) {
      window.location.href = "/success";
      clearFields();
    }
  });
}

function clearFields() {
  privacyCheckbox.checked = false;
  typeCheckboxes.forEach(typeCheckbox => {
    typeCheckbox.checked = false;
  });
  cityInputs.forEach(cityInput => {
    cityInput.checked = false;
  });
  textInputs.forEach(textInput => {
    textInput.value = "";
  });
}

function checkTypeOnChange() {
  typeCheckboxes.forEach(typeCheckbox => {
    typeCheckbox.addEventListener("change", () => {
      if (typeError.classList.contains("active")) {
        typeError.classList.remove("active");
      }
      return true;
    });
  });
}

function checkTypeOnSubmit() {
  for (let i = 0; i < typeCheckboxes.length; i++) {
    if (typeCheckboxes[i].checked) {
      return true;
    }
  }
  typeError.classList.add("active");
  scrollToError(typeCheckboxes[0]);
  return false;
}

function checkCityOnChange() {
  cityInputs.forEach(cityInput => {
    cityInput.addEventListener("change", () => {
      if (cityError.classList.contains("active")) {
        cityError.classList.remove("active");
      }
      return true;
    });
  });
}

function checkCityOnSubmit() {
  for (let i = 0; i < cityInputs.length; i++) {
    if (cityInputs[i].checked) {
      return true;
    }
  }
  cityError.classList.add("active");
  scrollToError(cityInputs[0]);
  return false;
}

function checkTextsOnChange() {
  textInputs.forEach(textInput => {
    textInput.addEventListener("change", () => {
      if (textInput.value !== "") {
        if (textInput.previousElementSibling.classList.contains("active")) {
          textInput.previousElementSibling.classList.remove("active");
          textInput.classList.remove("form__error");
        }

        if (checkEmail(emailInput)) {
          if (emailInput.previousElementSibling.classList.contains("active")) {
            emailInput.previousElementSibling.classList.remove("active");
            emailInput.classList.remove("form__error");
          }
        } else {
          emailInput.previousElementSibling.classList.add("active");
          emailInput.classList.add("form__error");
        }
      } else {
        textInput.previousElementSibling.classList.add("active");
        textInput.classList.add("form__error");
      }
    });
  });
}

function checkTextsOnSubmit() {
  let areAllFull = false;
  textInputs.forEach(textInput => {
    if (textInput.value !== "") {
      if (checkEmail(emailInput)) {
        if (emailInput.previousElementSibling.classList.contains("active")) {
          emailInput.previousElementSibling.classList.remove("active");
          emailInput.classList.remove("form__error");
        }
      } else {
        emailInput.previousElementSibling.classList.add("active");
        emailInput.classList.add("form__error");
        scrollToError(emailInput);
        return (areAllFull = false);
      }
      areAllFull = true;
    } else {
      textInput.previousElementSibling.classList.add("active");
      textInput.classList.add("form__error");
      scrollToError(textInputs[0]);
      areAllFull = false;
    }
  });
  return areAllFull;
}

function checkEmailOnChange() {
  emailInput.addEventListener("change", () => {
    checkEmail(emailInput);
  });
}

function scrollToError(element) {
  window.scrollTo({
    top: element.parentElement.offsetTop - 150,
    behavior: "smooth"
  });
}

function checkEmail(input) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.value.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function checkFileOnSubmit() {
  let fileOK = false;
  if (!allowedExtensions.exec(fileInput.value)) {
    fileError.classList.add("active");
    fileInputLabel.classList.add("file-input__error");
    scrollToError(fileInput);
    fileOK = false;
  } else {
    fileError.classList.remove("active");
    fileInputLabel.classList.remove("file-input__error");
    fileOK = true;
  }
  return fileOK;
}

function checkFileOnChange() {
  fileInput.onchange = function uploadFileName() {
    fileInputFieldTextContent.textContent = this.files[0].name;
    if (!allowedExtensions.exec(fileInput.value)) {
      fileError.classList.add("active");
      // fileInputLabel.classList.add("file-input__error");
      console.log("cia");
      

    } else {
      fileError.classList.remove("active");
      fileInputLabel.classList.remove("file-input__error");

    }
    if (fileInputFieldTextContent.value !== "") {
      fileInputIcon.style.display = "none";
      fileInputIconClear.style.display = "block";
      fileInputButton.style.display = "block";
    }
  };
}
/* eslint-enable */
