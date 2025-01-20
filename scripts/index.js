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

//Variables

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-name-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
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
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

// Event listeners

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
