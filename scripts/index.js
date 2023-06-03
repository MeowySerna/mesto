import { initialCards } from "./constants.js";
//popups
let editPopup = document.querySelector(".popup");
let addPopup = document.querySelector(".popup_type_add");
let ImagePopup = document.querySelector(".popup_type_image");
//forms
let formEditElement = document.querySelector(".popup__form");
let formAddElement = document.querySelector(".popup__form_type_add");
//inputs
let nameInput = document.querySelector("#input_name");
let jobInput = document.querySelector("#input_description");
let imageNameInput = document.querySelector("#input_image-name");
let imageLinkInput = document.querySelector("#input_image-link");
//close buttons
let closeEditButton = document.querySelector(".popup__close-button");
let closeAddButton = addPopup.querySelector(" .popup__close-button");
let closeImageButton = ImagePopup.querySelector(".popup__close-button");
//action buttons
let addButton = document.querySelector(".profile__add-button");
let editButton = document.querySelector(".profile__edit-button");
//content
let nameDisplay = document.querySelector(".profile__name");
let jobDisplay = document.querySelector(".profile__description");
let cardTemplate = document.querySelector("#card");
let cardContainer = document.querySelector(".cards__list");
let popupImage = document.querySelector(".popup__image");
let popupCaption = document.querySelector(".popup__image-caption");

const openEditPopup = () => {
  editPopup.classList.add("visible");
  editPopup.classList.remove("hidden");
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
};

const openAddPopup = () => {
  addPopup.classList.add("visible");
  addPopup.classList.remove("hidden");
};

const closeEditPopup = () => {
  editPopup.classList.remove("visible");
  editPopup.classList.add("hidden");
};

const closeAddPopup = () => {
  addPopup.classList.remove("visible");
  addPopup.classList.add("hidden");
};

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

  const cardOpen = () => {
    popupImage.src = cardPhoto.src;
    popupImage.alt = cardPhoto.alt;
    popupCaption.textContent = cardName.textContent;

    ImagePopup.classList.add("visible");
    ImagePopup.classList.remove("hidden");
  };

  cardPhoto.addEventListener("click", cardOpen);

  const cardClose = () => {
    ImagePopup.classList.add("hidden");
    ImagePopup.classList.remove("visible");
  };
  closeImageButton.addEventListener("click", cardClose);
  return card;
};

const renderCard = (card) => {
  cardContainer.prepend(card);
};

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
  renderCard(newCard);
  closeAddPopup();
};

initialCards.forEach((card) => {
  const newCard = createCard(card);
  renderCard(newCard);
});

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeEditButton.addEventListener("click", closeEditPopup);
closeAddButton.addEventListener("click", closeAddPopup);
formEditElement.addEventListener("submit", handleFormEditSubmit);
formAddElement.addEventListener("submit", handleFormAddSubmit);
