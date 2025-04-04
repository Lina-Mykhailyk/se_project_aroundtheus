export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      avatar: this._userAvatarElement.src,
    };
  }

  setUserInfo({ userName, userDescription, avatar }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
    if (avatar) {
      this._userAvatarElement.src = avatar;
    }
    this._userAvatarElement.onload = () => {
      this._userAvatarElement.classList.add("loaded");
    };
  }
}
