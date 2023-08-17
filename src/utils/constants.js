export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const VALIDATION_CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__error-message_hidden",
};
// Form elements
export const formEditElement = document.forms["edit-form"];
export const formAddElement = document.forms["add-form"];

// Inputs
export const nameInput = formEditElement.elements.name;
export const jobInput = formEditElement.elements.description;
export const imageNameInput = formAddElement.elements["image-name"];
export const imageLinkInput = formAddElement.elements.link;

// Action buttons
export const addButton = document.querySelector(".profile__add-button");
export const editButton = document.querySelector(".profile__edit-button");
