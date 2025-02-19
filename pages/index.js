import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

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

// Variables add
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

// Variables preview
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewCaption = previewImageModal.querySelector(
  ".modal__preview-caption"
);

// Variables form
const profileNameInput = document.querySelector("#modal-name-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const cardTitleInput = document.querySelector("#modal-title-input");
const cardLinkInput = document.querySelector("#modal-link-input");
const profileEditForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

// Validation variables
const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addFormValidator = new FormValidator(validationOptions, addCardForm);

// Other variables
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardListElement = document.querySelector(".cards__list");
const closeButtons = document.querySelectorAll(".modal__close-button");
const cardSelector = "#card-template";

// Functions

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function closeModalOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  openPopup(previewImageModal);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, cardSelector, handleImageClick);
  return cardElement.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
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
  evt.target.reset();
  addFormValidator.resetValidation();
  closePopup(addCardModal);
}

// Event listeners

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openPopup(profileEditModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", () => openPopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

editFormValidator.enableValidation();
addFormValidator.enableValidation();
