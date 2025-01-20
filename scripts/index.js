const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Variables edit
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);

// Variables add
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-button"
);

// Variables preview
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewCaption = document.querySelector(".modal__preview-caption");
const previewImageModalCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);

// Variables form
const profileNameInput = document.querySelector("#modal-name-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const cardTitleInput = document.querySelector("#modal-title-input");
const cardLinkInput = document.querySelector("#modal-link-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");

// Other variables
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListElement);
  closePopup(addCardModal);
}

// Event listeners

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", () => openPopup(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

previewImageModalCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
