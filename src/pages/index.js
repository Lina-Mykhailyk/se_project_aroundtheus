import { validationOptions, buttons } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

// Universal function for handling form submissions

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);

  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// Popups

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    const makeRequest = () =>
      api
        .updateUserProfile(data.userName, data.userDescription)
        .then((updatedData) => {
          userInfo.setUserInfo({
            userName: updatedData.name,
            userDescription: updatedData.about,
          });
        });

    handleSubmit(makeRequest, editProfilePopup);
  },
});

const updateAvatarPopup = new PopupWithForm({
  popupSelector: "#update-avatar-modal",
  handleFormSubmit: (data) => {
    const makeRequest = () =>
      api.updateUserAvatar(data.link).then((updatedData) => {
        userInfo.setUserInfo({
          avatar: updatedData.avatar,
        });
      });

    handleSubmit(makeRequest, updateAvatarPopup);
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (cardData) => {
    const makeRequest = () =>
      api.addNewCard(cardData).then((newCardData) => {
        const newCardElement = createCard(newCardData);
        cardList.addItem(newCardElement, true);
      });

    handleSubmit(makeRequest, addCardPopup);
  },
});

const previewImagePopup = new PopupWithImage("#preview-image-modal");

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");

// Card instance

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      previewImagePopup.open({ link: cardData.link, name: cardData.name });
    },
    (cardId) => {
      deleteCardPopup.open(() => {
        const makeRequest = () =>
          api.deleteCard(cardId).then(() => {
            const cardElement = document.querySelector(
              `.card[data-id="${cardId}"]`
            );
            cardElement.remove();
          });

        handleSubmit(makeRequest, deleteCardPopup, "Deleting...");
      });
    },
    (cardId) => {
      const makeRequest = () =>
        api.likeCard(cardId).then((updatedCardData) => {
          card.updateLikeButton(updatedCardData.isLiked);
        });

      handleSubmit(makeRequest, card);
    },
    (cardId) => {
      const makeRequest = () =>
        api.dislikeCard(cardId).then((updatedCardData) => {
          card.updateLikeButton(updatedCardData.isLiked);
        });

      handleSubmit(makeRequest, card);
    }
  );
  return card.getView();
}

// Api instance

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3fd446db-e54d-438e-b742-4b3d652cdb08",
    "Content-Type": "application/json",
  },
});

// User Info

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error("Error fetching user info:", err));

// Card List

const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Fetch cards from API

api
  .getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
  })
  .catch((err) => console.error("Error fetching cards:", err));

// Validation

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationOptions);

// Event listeners

buttons.editProfileButton.addEventListener("click", () => {
  const { userName, userDescription } = userInfo.getUserInfo();
  editProfilePopup.setInputValues({ userName, userDescription });
  formValidators["edit-profile-form"].resetValidation();
  editProfilePopup.open();
});

buttons.addCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  addCardPopup.open();
});

buttons.editAvatarButton.addEventListener("click", () => {
  formValidators["update-avatar-form"].resetValidation();
  updateAvatarPopup.open();
});

// Set event listeners for popups

previewImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
