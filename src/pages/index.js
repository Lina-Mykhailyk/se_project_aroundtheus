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

// Popups

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    editProfilePopup.setLoading(true, "Saving...");

    api
      .updateUserProfile(data.userName, data.userDescription)
      .then((updatedData) => {
        userInfo.setUserInfo({
          userName: updatedData.name,
          userDescription: updatedData.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => console.error("Error updating user profile:", err))
      .finally(() => {
        editProfilePopup.setLoading(false);
      });
  },
});

const updateAvatarPopup = new PopupWithForm({
  popupSelector: "#update-avatar-modal",
  handleFormSubmit: (data) => {
    const avatarLink = data.link;
    updateAvatarPopup.setLoading(true, "Saving...");

    api
      .updateUserAvatar(avatarLink)
      .then((updatedData) => {
        const profileAvatar = document.querySelector(".profile__avatar");
        profileAvatar.src = updatedData.avatar;
        updateAvatarPopup.close();
      })
      .catch((err) => console.error("Error updating profile picture:", err))
      .finally(() => {
        updateAvatarPopup.setLoading(false);
      });
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (cardData) => {
    addCardPopup.setLoading(true, "Saving...");

    api
      .addNewCard(cardData)
      .then((newCardData) => {
        const newCardElement = createCard(newCardData);
        cardList.addItem(newCardElement, true);
        addCardPopup.close();
        addCardPopup.resetForm();
      })
      .catch((err) => console.error("Error adding new card:", err))
      .finally(() => {
        addCardPopup.setLoading(false);
      });
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
        api
          .deleteCard(cardId)
          .then(() => {
            const cardElement = document.querySelector(
              `.card[data-id="${cardId}"]`
            );
            cardElement.remove();
          })
          .catch((err) => console.error("Error deleting card:", err));
      });
    },
    (cardId) => {
      api
        .likeCard(cardId)
        .then((updatedCardData) => {
          card.updateLikeButton(updatedCardData.isLiked);
        })
        .catch((err) => console.error("Error liking card:", err));
    },
    (cardId) => {
      api
        .dislikeCard(cardId)
        .then((updatedCardData) => {
          card.updateLikeButton(updatedCardData.isLiked);
        })
        .catch((err) => console.error("Error disliking card:", err));
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

const editFormValidator = new FormValidator(
  validationOptions,
  editProfilePopup.getForm()
);
const addFormValidator = new FormValidator(
  validationOptions,
  addCardPopup.getForm()
);

const editAvatarFormValidator = new FormValidator(
  validationOptions,
  updateAvatarPopup.getForm()
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

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

buttons.editAvatarButton.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();
  updateAvatarPopup.open();
});

// Set event listeners for popups

previewImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
