import { VALIDATION_CONFIG } from "./constants.js";

const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.remove(config.errorClass);
};
export const disableButton = (buttonElement,config) => {
  buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add(config.inactiveButtonClass);
};

const enableButton = (buttonElement,config) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(config.inactiveButtonClass);
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  const isFormValid = !hasInvalidInput(inputList);

  if (isFormValid) {
    enableButton(buttonElement,config);
  } else {
    disableButton(buttonElement,config);
  }
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputList,
  buttonElement,
  config
) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
  toggleButtonState(inputList, buttonElement, config);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputList,
        buttonElement,
        config
      );
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

enableValidation(VALIDATION_CONFIG);
