function updateTimer() {
  const targetDate = new Date("May 1, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  document.getElementById("modal-days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("modal-hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("modal-minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("modal-seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  document.getElementById("mobile-days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("mobile-hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("mobile-minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("mobile-seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

setInterval(updateTimer, 1000);
updateTimer();

const form = document.getElementById("registration-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const termsCheckbox = document.getElementById("terms");
const checkbox = document.getElementById("checkbox");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const termsError = document.getElementById("terms-error");

const modalForm = document.getElementById("modal-registration-form");
const modalNameInput = document.getElementById("modal-name");
const modalEmailInput = document.getElementById("modal-email");
const modalPhoneInput = document.getElementById("modal-phone");
const modalTermsCheckbox = document.getElementById("modal-terms");
const modalCheckbox = document.getElementById("modal-checkbox");

const modalNameError = document.getElementById("modal-name-error");
const modalEmailError = document.getElementById("modal-email-error");
const modalPhoneError = document.getElementById("modal-phone-error");
const modalTermsError = document.getElementById("modal-terms-error");

const modal = document.getElementById("registration-modal");
const registerButtonMobile = document.getElementById("register-button-mobile");
const closeModalButton = document.getElementById("close-modal");

registerButtonMobile.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});

function handleScreenChange(mediaQuery) {
  if (!mediaQuery.matches) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

const mediaQuery = window.matchMedia("(max-width: 360px)");

handleScreenChange(mediaQuery);

mediaQuery.addEventListener("change", handleScreenChange);

const validateName = (input, errorElement) => {
  if (!input.value.trim()) {
    input.classList.add("error");
    errorElement.textContent = "Будь ласка, введіть ваше ім'я";
    return false;
  } else {
    input.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }
};

const validateEmail = (input, errorElement) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.value.trim()) {
    input.classList.add("error");
    errorElement.textContent = "Будь ласка, введіть вашу електронну пошту";
    return false;
  } else if (!emailRegex.test(input.value)) {
    input.classList.add("error");
    errorElement.textContent = "Будь ласка, введіть коректну електронну пошту";
    return false;
  } else {
    input.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }
};

const phoneTemplate = "+380 -- -- -- --";
let phoneDigitsOnly = "";
let modalPhoneDigitsOnly = "";

const setupPhoneInput = (input) => {
  input.value = phoneTemplate;

  input.addEventListener("input", function (e) {
    const cursorPosition = this.selectionStart;
    const inputValue = this.value.replace(/\D/g, "");

    if (inputValue.length < 3) {
      this.value = phoneTemplate;
      this.setSelectionRange(5, 5);
      return;
    }

    const digitsOnly = inputValue.substring(3);
    if (this.id === "phone") {
      phoneDigitsOnly = digitsOnly;
    } else {
      modalPhoneDigitsOnly = digitsOnly;
    }

    let formatted = "+380";

    if (digitsOnly.length > 0) {
      formatted +=
        " " + digitsOnly.substring(0, Math.min(2, digitsOnly.length));
      if (digitsOnly.length < 2) {
        formatted += "-";
      }
    } else {
      formatted += " --";
    }

    if (digitsOnly.length > 2) {
      formatted +=
        " " + digitsOnly.substring(2, Math.min(5, digitsOnly.length));
      if (digitsOnly.length < 5) {
        formatted +=
          digitsOnly.length === 2
            ? "-- --"
            : digitsOnly.length === 3
            ? "- --"
            : digitsOnly.length === 4
            ? "- --"
            : "";
      }
    } else {
      formatted += " --";
    }

    if (digitsOnly.length > 5) {
      formatted +=
        " " + digitsOnly.substring(5, Math.min(7, digitsOnly.length));
      if (digitsOnly.length < 7) {
        formatted += digitsOnly.length === 6 ? "-" : "";
      }
    } else if (digitsOnly.length <= 5) {
      formatted += " --";
    }

    if (digitsOnly.length > 7) {
      formatted += " " + digitsOnly.substring(7, 9);
    } else if (digitsOnly.length <= 7) {
      formatted += " --";
    }

    this.value = formatted;

    const newPosition = Math.min(
      e.inputType === "deleteContentBackward"
        ? cursorPosition
        : digitsOnly.length <= 2
        ? 5 + digitsOnly.length
        : digitsOnly.length <= 5
        ? 8 + (digitsOnly.length - 2)
        : digitsOnly.length <= 7
        ? 12 + (digitsOnly.length - 5)
        : 16 + (digitsOnly.length - 7),
      this.value.length
    );

    this.setSelectionRange(newPosition, newPosition);
  });

  input.addEventListener("keydown", function (e) {
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      if (e.keyCode === 8 && this.selectionStart <= 5) {
        e.preventDefault();
      }
      return;
    }

    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }

    const digitsOnly =
      this.id === "phone" ? phoneDigitsOnly : modalPhoneDigitsOnly;
    if (
      digitsOnly.length >= 9 &&
      !(
        e.keyCode === 8 ||
        e.keyCode === 46 ||
        (e.keyCode >= 35 && e.keyCode <= 39)
      )
    ) {
      e.preventDefault();
    }
  });

  input.addEventListener("focus", function () {
    if (this.value === "") {
      this.value = phoneTemplate;
      setTimeout(() => {
        this.setSelectionRange(5, 5);
      }, 0);
    }
  });

  input.addEventListener("blur", function () {
    if (this.value === phoneTemplate) {
      this.value = "";
    }
  });
};

setupPhoneInput(phoneInput);
setupPhoneInput(modalPhoneInput);

const validatePhone = (input, errorElement, digitsOnly) => {
  const phoneValue = input.value;
  const phoneDigits = phoneValue.replace(/\D/g, "").substring(3);

  if (!phoneValue || phoneValue === phoneTemplate) {
    input.classList.add("error");
    errorElement.textContent = "Будь ласка, введіть ваш номер телефону";
    return false;
  } else if (phoneDigits.length < 9) {
    input.classList.add("error");
    errorElement.textContent = "Будь ласка, введіть повний номер телефону";
    return false;
  } else {
    input.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }
};

const validateTerms = (checkbox, errorElement) => {
  if (!checkbox.checked) {
    document
      .getElementById(checkbox.id === "terms" ? "checkbox" : "modal-checkbox")
      .classList.add("error");
    errorElement.textContent = "Будь ласка, погодьтеся з умовами";
    return false;
  } else {
    document
      .getElementById(checkbox.id === "terms" ? "checkbox" : "modal-checkbox")
      .classList.remove("error");
    errorElement.textContent = "";
    return true;
  }
};

termsCheckbox.addEventListener("change", () => {
  if (termsCheckbox.checked) {
    checkbox.classList.add("checked");
  } else {
    checkbox.classList.remove("checked");
  }
  validateTerms(termsCheckbox, termsError);
});

modalTermsCheckbox.addEventListener("change", () => {
  if (modalTermsCheckbox.checked) {
    modalCheckbox.classList.add("checked");
  } else {
    modalCheckbox.classList.remove("checked");
  }
  validateTerms(modalTermsCheckbox, modalTermsError);
});

nameInput.addEventListener("input", () => validateName(nameInput, nameError));
emailInput.addEventListener("input", () =>
  validateEmail(emailInput, emailError)
);
phoneInput.addEventListener("input", () =>
  validatePhone(phoneInput, phoneError, phoneDigitsOnly)
);

modalNameInput.addEventListener("input", () =>
  validateName(modalNameInput, modalNameError)
);
modalEmailInput.addEventListener("input", () =>
  validateEmail(modalEmailInput, modalEmailError)
);
modalPhoneInput.addEventListener("input", () =>
  validatePhone(modalPhoneInput, modalPhoneError, modalPhoneDigitsOnly)
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateName(nameInput, nameError);
  const isEmailValid = validateEmail(emailInput, emailError);
  const isPhoneValid = validatePhone(phoneInput, phoneError, phoneDigitsOnly);
  const areTermsAccepted = validateTerms(termsCheckbox, termsError);

  if (isNameValid && isEmailValid && isPhoneValid && areTermsAccepted) {
    const phoneDigits = phoneInput.value.replace(/\D/g, "");

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: `+${phoneDigits}`,
      termsAccepted: termsCheckbox.checked,
    };

    fetch("https://example.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Дякуємо за реєстрацію!");
          form.reset();
          phoneInput.value = "";
          checkbox.classList.remove("checked");
        } else {
          alert(
            "Виникла помилка при відправці форми. Будь ласка, спробуйте пізніше."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Виникла помилка при відправці форми. Будь ласка, спробуйте пізніше."
        );
      });
  }
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateName(modalNameInput, modalNameError);
  const isEmailValid = validateEmail(modalEmailInput, modalEmailError);
  const isPhoneValid = validatePhone(
    modalPhoneInput,
    modalPhoneError,
    modalPhoneDigitsOnly
  );
  const areTermsAccepted = validateTerms(modalTermsCheckbox, modalTermsError);

  if (isNameValid && isEmailValid && isPhoneValid && areTermsAccepted) {
    const phoneDigits = modalPhoneInput.value.replace(/\D/g, "");

    const formData = {
      name: modalNameInput.value.trim(),
      email: modalEmailInput.value.trim(),
      phone: `+${phoneDigits}`,
      termsAccepted: modalTermsCheckbox.checked,
    };

    fetch("https://example.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Дякуємо за реєстрацію!");
          modalForm.reset();
          modalPhoneInput.value = "";
          modalCheckbox.classList.remove("checked");
          modal.style.display = "none";
          document.body.style.overflow = "";
        } else {
          alert(
            "Виникла помилка при відправці форми. Будь ласка, спробуйте пізніше."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Виникла помилка при відправці форми. Будь ласка, спробуйте пізніше."
        );
      });
  }
});
