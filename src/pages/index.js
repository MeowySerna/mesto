// Import statements
import "./index.css";
import { VALIDATION_CONFIG } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithSubmit from "../components/PopupWithSubmit";

// Form elements
const formEditElement = document.forms["edit-form"];
const formAddElement = document.forms["add-form"];
const formAvatarElement = document.forms["avatar-form"];

// Inputs
const nameInput = formEditElement.elements.name;
const jobInput = formEditElement.elements.about;

// Action buttons
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".profile__avatar-edit");
const submitAddButton = formAddElement.elements.addsubmit;
const submitEditButton = formEditElement.elements.editsubmit;
const submitAvatarButton = formAvatarElement.elements.avatarsubmit;
// Form validators
const formAddValidator = new FormValidator(VALIDATION_CONFIG, formAddElement);
const formEditValidator = new FormValidator(VALIDATION_CONFIG, formEditElement);
const formAvatarValidator = new FormValidator(
  VALIDATION_CONFIG,
  formAvatarElement
);
let userId;

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-74/",
  headers: {
    authorization: "64e404e9-f7a8-42cf-bd55-2fdfa91c3cc8",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiConfig);

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profileData, cardsData]) => {
    userId = profileData._id;
    cardsContainer.renderElements(cardsData);
    userInfo.setUserInfo(profileData);
    userInfo.setUserAvatar(profileData);
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card",
    {
      handleCardClick: (name, link) => {
        imagePopup.open(name, link);
      },

      handleCardDelete: (id, cardElement) => {
        confirmPopup.setHandler(() => {
          api
            .deleteCard(id, cardElement)
            .then(() => {
              card.removeCard(cardElement);
              confirmPopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        confirmPopup.open();
      },
    },
    userId,
    {
      addLike: (id, likes, likesCounter, likeButton) => {
        api
          .addLike(id)
          .then((data) => {
            likes = data.likes;
            likesCounter.textContent = likes.length;
            likeButton.classList.add("card__like_active");
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deleteLike: (id, likes, likesCounter, likeButton) => {
        api
          .deleteLike(id)
          .then((data) => {
            likes = data.likes;
            likesCounter.textContent = likes.length;
            likeButton.classList.remove("card__like_active");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const addCard = (cardData) => {
  const card = createCard(cardData);
  cardsContainer.addItem(card);
};
const addNewCard = (cardData) => {
  const card = createCard(cardData);
  cardsContainer.addNewItem(card);
};

const cardsContainer = new Section(
  {
    renderer: addCard,
  },
  ".cards__list"
);

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const handleAddformSubmit = (newCardData) => {
  submitAddButton.textContent = "Сохранение...";
  api
    .createCard(newCardData)
    .then((result) => {
      addNewCard(result);
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAddButton.textContent = "Создать";
    });

  formAddValidator.disableButton();
};

addButton.addEventListener("click", () => {
  addPopup.open();
});

editButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  editPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

const addPopup = new PopupWithForm(".popup_type_add", handleAddformSubmit);
addPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

const handleEditformSubmit = (data) => {
  submitEditButton.textContent = "Сохранение...";
  api
    .updateUser(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAddButton.textContent = "Сохранить";
    });
};
const handleAvatarformSubmit = (data) => {
  submitAvatarButton.textContent = "Сохранение...";
  api
    .updateAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAvatarButton.textContent = "Сохранить";
    });
  formAvatarValidator.disableButton();
};

const editPopup = new PopupWithForm(
  ".popup_type_edit",
  handleEditformSubmit,
  formEditElement
);

const confirmPopup = new PopupWithSubmit(".popup_type_confirm");
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  handleAvatarformSubmit
);

avatarPopup.setEventListeners();
editPopup.setEventListeners();
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();
