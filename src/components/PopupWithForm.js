import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
