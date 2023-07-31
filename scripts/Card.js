export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".card__like");
    const trashButton = this._element.querySelector(".card__trash-button");

    cardLikeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    trashButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }

  _handleCardLike() {
    const cardLikeButton = this._element.querySelector(".card__like");
    cardLikeButton.classList.toggle("card__like_active");
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
