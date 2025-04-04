import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__save");
    this._submitButtonContent = this._submitButton.textContent;
  }

  getForm() {
    return this._popupForm;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputElements.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputValues = this._getInputValues();
      this._handleFormSubmit(this._inputValues);
      this.close();
    });
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonContent;
      this._submitButton.disabled = false;
    }
  }

  close() {
    super.close();
  }

  resetForm() {
    this._popupForm.reset();
  }
}
