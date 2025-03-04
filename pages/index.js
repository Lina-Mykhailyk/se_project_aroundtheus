import {
  initialCards,
  validationOptions,
  profileConfig,
  formConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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
    const card = new Card(cardData, "#card-template", (cardData) => {
      previewImagePopup.open({ link: cardData.link, name: cardData.name });
    });
    cardList.addItem(card.getView());
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
      const card = new Card(cardData, "#card-template", (cardData) => {
        previewImagePopup.open({ link: cardData.link, name: cardData.name });
      });
      const cardElement = card.getView();
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
  formConfig.editProfileForm
);
const addFormValidator = new FormValidator(
  validationOptions,
  formConfig.addCardForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event listeners

profileConfig.editProfileButton.addEventListener("click", () => {
  const { userName, userDescription } = userInfo.getUserInfo();
  profileConfig.profileNameInput.value = userName;
  profileConfig.profileDescriptionInput.value = userDescription;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

profileConfig.addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

// Set event listeners for popups

previewImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
