import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__preview-image");
    this._caption = this._popupElement.querySelector(".modal__preview-caption");
  }

  open({ link, name }) {
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
