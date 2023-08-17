export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".card__like");
    const trashButton = this._element.querySelector(".card__trash-button");
    const cardImage = this._element.querySelector(".card__image");

    cardLikeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    trashButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleCardLike() {
    const cardLikeButton = this._element.querySelector(".card__like");
    cardLikeButton.classList.toggle("card__like_active");
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
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
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

}
