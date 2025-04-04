class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike,
    handleDislike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      const isActive = this._likeButton.classList.contains(
        "card__like-button_active"
      );
      isActive ? this._handleDislike(this._id) : this._handleLike(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  updateLikeButton(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );
  }

  getView() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._element.setAttribute("data-id", this._id);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.updateLikeButton(this._isLiked);

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
