import { VALIDATION_CONFIG, initialCards } from "./constants.js";

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
const cardTemplate = document.querySelector("#card");
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
  if (evt.target.classList.contains('popup')) {
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
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardName = card.querySelector(".card__title");
  const cardPhoto = card.querySelector(".card__image");

  cardName.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;

  const cardLikeButton = card.querySelector(".card__like");
  const cardTrashButton = card.querySelector(".card__trash-button");

  const likeCard = () => {
    cardLikeButton.classList.toggle("card__like_active");
  };

  const handleDelete = () => {
    card.remove();
  };

  cardLikeButton.addEventListener("click", likeCard);
  cardTrashButton.addEventListener("click", handleDelete);

  const openCard = () => {
    popupImage.src = cardPhoto.src;
    popupImage.alt = cardPhoto.alt;
    popupCaption.textContent = cardName.textContent;
    openPopup(imagePopup);
  };

  cardPhoto.addEventListener("click", openCard);

  return card;
};

const renderCard = (card, container) => {
  container.prepend(card);
};

// Form submit handlers
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;
  closeEditPopup();
};

const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };
  const newCard = createCard(newCardData);
  renderCard(newCard, cardContainer);
  const buttonElement = formAddElement.querySelector(VALIDATION_CONFIG.submitButtonSelector)
  buttonElement.setAttribute("disabled", "");
  buttonElement.classList.add(VALIDATION_CONFIG.inactiveButtonClass);
  formAddElement.reset();
  closeAddPopup();
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
const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach((popup) => {
  popup.addEventListener('click', popupOverlayClick);
});
