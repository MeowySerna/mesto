import { VALIDATION_CONFIG, initialCards } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Popups
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup_type_image");

// Forms
const formEditElement = editPopup.querySelector(".popup__form");
const formAddElement = addPopup.querySelector(".popup__form");

// Inputs
const nameInput = formEditElement.querySelector("#input_name");
const jobInput = formEditElement.querySelector("#input_description");
const imageNameInput = formAddElement.querySelector("#input_image-name");
const imageLinkInput = formAddElement.querySelector("#input_image-link");

// Close buttons
const closeEditButton = editPopup.querySelector(".popup__close-button");
const closeAddButton = addPopup.querySelector(".popup__close-button");
const closeImageButton = imagePopup.querySelector(".popup__close-button");

// Action buttons
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

// Content
const nameDisplay = document.querySelector(".profile__name");
const jobDisplay = document.querySelector(".profile__description");
const cardContainer = document.querySelector(".cards__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__image-caption");

// Event listeners
const popupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const popupOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

// Popup functions
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", popupEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", popupEsc);
};

// Card functions
const createCard = (cardData) => {
  const cardElement = new Card(cardData, "#card", openCard).generateCard();
  return cardElement;
};
const openCard = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
};

const renderCard = (card) => {
  cardContainer.prepend(card);
};

// Form submit handlers
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;
  closeEditPopup();
};

const formAddValidator = new FormValidator(VALIDATION_CONFIG, formAddElement);
const formEditValidator = new FormValidator(VALIDATION_CONFIG, formEditElement);

const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };
  const newCard = createCard(newCardData);
  renderCard(newCard);
  formAddElement.reset();
  closeAddPopup();
  formAddValidator.disableButton();
};

// Initial card rendering

initialCards.forEach((card) => {
  const newCard = createCard(card);
  renderCard(newCard);
});

// Popup open functions
const openEditPopup = () => {
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
  openPopup(editPopup);
};

const openAddPopup = () => {
  openPopup(addPopup);
};

// Popup close functions
const closeEditPopup = () => {
  closePopup(editPopup);
};

const closeAddPopup = () => {
  closePopup(addPopup);
};

const closeImagePopup = () => {
  closePopup(imagePopup);
};

// Event listeners for close buttons and form submissions
closeImageButton.addEventListener("click", closeImagePopup);
editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeEditButton.addEventListener("click", closeEditPopup);
closeAddButton.addEventListener("click", closeAddPopup);
formEditElement.addEventListener("submit", handleFormEditSubmit);
formAddElement.addEventListener("submit", handleFormAddSubmit);

// Set click listeners for popups overlay
const popups = Array.from(document.querySelectorAll(".popup"));

popups.forEach((popup) => {
  popup.addEventListener("click", popupOverlayClick);
});

formAddValidator.enableValidation();
formEditValidator.enableValidation();
