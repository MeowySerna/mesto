// Import statements
import "./index.css";
import { VALIDATION_CONFIG, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Form elements
const formEditElement = document.forms["edit-form"];
const formAddElement = document.forms["add-form"];

// Inputs
const nameInput = formEditElement.elements.name;
const jobInput = formEditElement.elements.info;

// Action buttons
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
// Form validators
const formAddValidator = new FormValidator(VALIDATION_CONFIG, formAddElement);
const formEditValidator = new FormValidator(VALIDATION_CONFIG, formEditElement);

const createCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    "#card",
    handleCardClick
  ).generateCard();
  return cardElement;
};

const addCard = (cardData) => {
  const card = createCard(cardData);
  initialCardList.addItem(card);
};

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const initialCardList = new Section(
  {
    renderer: addCard,
  },
  ".cards__list"
);
initialCardList.renderElements(initialCards);

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const handleAddformSubmit = (newCardData) => {
  addCard(newCardData);
  addPopup.close();
  formAddValidator.disableButton();
};

addButton.addEventListener("click", () => {
  addPopup.open();
});

editButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  editPopup.open();
});

const addPopup = new PopupWithForm(".popup_type_add", handleAddformSubmit);
addPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
});

const handleEditformSubmit = (data) => {
  userInfo.setUserInfo(data);
  editPopup.close();
};

const editPopup = new PopupWithForm(
  ".popup_type_edit",
  handleEditformSubmit,
  formEditElement
);
editPopup.setEventListeners();
formAddValidator.enableValidation();
formEditValidator.enableValidation();
