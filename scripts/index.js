let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector("#input_name");
let jobInput = document.querySelector("#input_description");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let nameDisplay = document.querySelector(".profile__name");
let jobDisplay = document.querySelector(".profile__description");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
