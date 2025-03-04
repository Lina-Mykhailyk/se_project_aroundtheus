import {
  initialCards,
  validationOptions,
  buttons,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (cardData) => {
    previewImagePopup.open({ link: cardData.link, name: cardData.name });
  });
  return card.getView();
}

// Instances

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
    addCardPopup.resetForm();
  },
});

const previewImagePopup = new PopupWithImage("#preview-image-modal");

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Render initial cards

cardList.renderItems(initialCards);

// Form validation

const editFormValidator = new FormValidator(
  validationOptions,
  editProfilePopup.getForm()
);
const addFormValidator = new FormValidator(
  validationOptions,
  addCardPopup.getForm()
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event listeners

buttons.editProfileButton.addEventListener("click", () => {
  const { userName, userDescription } = userInfo.getUserInfo();
  editProfilePopup.setInputValues({ userName, userDescription });
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

buttons.addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

// Set event listeners for popups

previewImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
