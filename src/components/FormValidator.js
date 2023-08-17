export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this._toggleButtonState();
  }
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(this._config.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    const isFormValid = !this._hasInvalidInput();
    if (isFormValid) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton() {
    this._submitButton.setAttribute("disabled", "");
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }
  enableValidation() {
    const formElement = this._formElement;

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
