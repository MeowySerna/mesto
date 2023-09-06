export default class Card {
  constructor(
    data,
    templateSelector,
    {handleCardClick,
    handleCardDelete},
    userId,
    {addLike,
    deleteLike}
  ) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._id = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this._id, this._element);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard() {
    if (this._cardLikeButton.classList.contains("card__like_active")) {
      this.deleteLike();
    } else {
      this.addLike();
    }

  }
  addLike() {
    this._addLike(this._id, this._likes, this._likeCounter,this._cardLikeButton);
  }
  deleteLike() {
    this._deleteLike(this._id, this._likes, this._likeCounter,this._cardLikeButton);
  }

  removeCard() {
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
    this._cardLikeButton = this._element.querySelector(".card__like");
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._likeCounter.textContent = this._likes.length;
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    if (this._likes.some((element) => element._id === this._userId)) {
      this._cardLikeButton.classList.add("card__like_active");
    }

    if (this._userId === this._ownerId) {
      this._trashButton.setAttribute("style", "display: flex;");
    }
    this._setEventListeners();
    return this._element;
  }
}
