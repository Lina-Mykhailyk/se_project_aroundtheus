import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(".modal__save");
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm()
        .then(() => {
          this.close();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }
}
