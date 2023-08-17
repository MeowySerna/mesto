// Import statements
import './index.css'
import {
  VALIDATION_CONFIG,
  initialCards,
  formEditElement,
  formAddElement,
  nameInput,
  jobInput,
  imageNameInput,
  imageLinkInput,
  addButton,
  editButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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

const addCard = ({ name, link }) => {
  const card = createCard({ name, link });
  initialCardList.addItem(card);
};

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const initialCardList = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  ".cards__list"
);
initialCardList.renderElements();

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const handleAddformSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };
  addCard(newCardData);
  addPopup.close();
  formAddValidator.disableButton();
};

addButton.addEventListener("click", () => {
  addPopup.open();
  formAddValidator.enableValidation();
});

editButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  editPopup.open();
  formEditValidator.enableValidation();
});

const addPopup = new PopupWithForm(".popup_type_add", handleAddformSubmit);
addPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
});

const handleEditformSubmit = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: nameInput.value,
    info: jobInput.value,
  });
  editPopup.close();
};

const editPopup = new PopupWithForm(
  ".popup_type_edit",
  handleEditformSubmit,
  formEditElement
);
editPopup.setEventListeners();
