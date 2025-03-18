!function(){"use strict";const e=[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],t={inputSelector:".modal__input",submitButtonSelector:".modal__save",inactiveButtonClass:"modal__save_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},s={editProfileButton:document.querySelector(".profile__edit-button"),addCardButton:document.querySelector(".profile__add-button")};var n=class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t}_showInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_toggleButtonState(e,t){let s=!1;e.forEach((e=>{e.validity.valid||(s=!0)})),s?(t.classList.add(this._inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}_setEventListeners(){this._inputElements=Array.from(this._form.querySelectorAll(this._inputSelector)),this._submitButton=this._form.querySelector(this._submitButtonSelector),this._inputElements.forEach((e=>{e.addEventListener("input",(t=>{this._checkInputValidity(e),this._toggleButtonState(this._inputElements,this._submitButton)}))}))}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}resetValidation(){this._inputElements.forEach((e=>{this._hideInputError(e)})),this._toggleButtonState(this._inputElements,this._submitButton)}},i=class{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handleImageClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeButton.addEventListener("click",(()=>{this._likeButton.classList.toggle("card__like-button_active")})),this._deleteButton.addEventListener("click",(()=>{this._element.remove()})),this._cardImage.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}getView(){return this._element=this._getTemplate(),this._likeButton=this._element.querySelector(".card__like-button"),this._deleteButton=this._element.querySelector(".card__delete-button"),this._cardImage=this._element.querySelector(".card__image"),this._cardTitle=this._element.querySelector(".card__title"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardTitle.textContent=this._name,this._setEventListeners(),this._element}};class r{constructor(e){this._popupElement=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}_handleEscClose(e){"Escape"===e.key&&(e.preventDefault(),this.close())}setEventListeners(){this._popupElement.addEventListener("click",(e=>{(e.target.classList.contains("modal")||e.target.classList.contains("modal__close-button"))&&this.close()}))}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class o extends r{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;super(t),this._popupForm=this._popupElement.querySelector(".modal__form"),this._handleFormSubmit=s,this._inputElements=this._popupElement.querySelectorAll(".modal__input")}getForm(){return this._popupForm}_getInputValues(){return this._inputValues={},this._inputElements.forEach((e=>{this._inputValues[e.name]=e.value})),this._inputValues}setInputValues(e){this._inputElements.forEach((t=>{e[t.name]&&(t.value=e[t.name])}))}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(e=>{e.preventDefault(),this._inputValues=this._getInputValues(),this._handleFormSubmit(this._inputValues),this.close()}))}close(){super.close()}resetForm(){this._popupForm.reset()}}function a(e){const t=new i(e,"#card-template",(e=>{u.open({link:e.link,name:e.name})}));return t.getView()}new class{constructor(e){let{baseUrl:t,authToken:s}=e;this._baseUrl=t,this._authToken=s}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:{authorization:this._authToken}}).then((e=>e.ok?e.json():Promise.reject(`Error: ${e.status}`))).then((e=>(console.log("API Call Success:",e),e))).catch((e=>{console.error("API Call Failed:",e)}))}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",authToken:"625a4303-69f9-48ff-bb51-08f3ac7dbd7c"}).getInitialCards().then((e=>{console.log("Received Data:",e)}));const l=new o({popupSelector:"#edit-profile-modal",handleFormSubmit:e=>{m.setUserInfo(e)}}),c=new o({popupSelector:"#add-card-modal",handleFormSubmit:e=>{const t=a(e);_.addItem(t),c.resetForm()}}),u=new class extends r{constructor(e){super(e),this._image=this._popupElement.querySelector(".modal__preview-image"),this._caption=this._popupElement.querySelector(".modal__preview-caption")}open(e){let{link:t,name:s}=e;this._caption.textContent=s,this._image.src=t,this._image.alt=s,super.open()}}("#preview-image-modal"),m=new class{constructor(e){let{userNameSelector:t,userDescriptionSelector:s}=e;this._userNameElement=document.querySelector(t),this._userDescriptionElement=document.querySelector(s)}getUserInfo(){return{userName:this._userNameElement.textContent,userDescription:this._userDescriptionElement.textContent}}setUserInfo(e){let{userName:t,userDescription:s}=e;this._userNameElement.textContent=t,this._userDescriptionElement.textContent=s}}({userNameSelector:".profile__title",userDescriptionSelector:".profile__description"}),_=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:e,renderer:e=>{const t=a(e);_.addItem(t)}},".cards__list");_.renderItems(e);const d=new n(t,l.getForm()),h=new n(t,c.getForm());d.enableValidation(),h.enableValidation(),s.editProfileButton.addEventListener("click",(()=>{const{userName:e,userDescription:t}=m.getUserInfo();l.setInputValues({userName:e,userDescription:t}),d.resetValidation(),l.open()})),s.addCardButton.addEventListener("click",(()=>{h.resetValidation(),c.open()})),u.setEventListeners(),l.setEventListeners(),c.setEventListeners()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoieUJBQU8sTUFBTUEsRUFBZSxDQUMxQixDQUNFQyxLQUFNLGtCQUNOQyxLQUFNLHNHQUVSLENBQ0VELEtBQU0sY0FDTkMsS0FBTSx5R0FFUixDQUNFRCxLQUFNLGlCQUNOQyxLQUFNLDRHQUVSLENBQ0VELEtBQU0sVUFDTkMsS0FBTSxxR0FFUixDQUNFRCxLQUFNLHdCQUNOQyxLQUFNLHFHQUVSLENBQ0VELEtBQU0saUJBQ05DLEtBQU0sbUdBSUdDLEVBQW9CLENBQy9CQyxjQUFlLGdCQUNmQyxxQkFBc0IsZUFDdEJDLG9CQUFxQix1QkFDckJDLGdCQUFpQiwwQkFDakJDLFdBQVksd0JBR0RDLEVBQVUsQ0FDckJDLGtCQUFtQkMsU0FBU0MsY0FBYyx5QkFDMUNDLGNBQWVGLFNBQVNDLGNBQWMseUJDMkN4QyxNQWhGQSxNQUNFRSxXQUFBQSxDQUFZQyxFQUFTQyxHQUNuQkMsS0FBS0MsZUFBaUJILEVBQVFYLGNBQzlCYSxLQUFLRSxzQkFBd0JKLEVBQVFWLHFCQUNyQ1ksS0FBS0cscUJBQXVCTCxFQUFRVCxvQkFDcENXLEtBQUtJLGlCQUFtQk4sRUFBUVIsZ0JBQ2hDVSxLQUFLSyxZQUFjUCxFQUFRUCxXQUMzQlMsS0FBS00sTUFBUVAsQ0FDZixDQUVBUSxlQUFBQSxDQUFnQkMsR0FDZCxNQUFNQyxFQUFzQlQsS0FBS00sTUFBTVgsY0FDckMsSUFBSWEsRUFBYUUsWUFFbkJGLEVBQWFHLFVBQVVDLElBQUlaLEtBQUtJLGtCQUNoQ0ssRUFBb0JJLFlBQWNMLEVBQWFNLGtCQUMvQ0wsRUFBb0JFLFVBQVVDLElBQUlaLEtBQUtLLFlBQ3pDLENBRUFVLGVBQUFBLENBQWdCUCxHQUNkLE1BQU1DLEVBQXNCVCxLQUFLTSxNQUFNWCxjQUNyQyxJQUFJYSxFQUFhRSxZQUVuQkYsRUFBYUcsVUFBVUssT0FBT2hCLEtBQUtJLGtCQUNuQ0ssRUFBb0JJLFlBQWMsR0FDbENKLEVBQW9CRSxVQUFVSyxPQUFPaEIsS0FBS0ssWUFDNUMsQ0FFQVksbUJBQUFBLENBQW9CVCxHQUNiQSxFQUFhVSxTQUFTQyxNQUd6Qm5CLEtBQUtlLGdCQUFnQlAsR0FGckJSLEtBQUtPLGdCQUFnQkMsRUFJekIsQ0FFQVksa0JBQUFBLENBQW1CQyxFQUFlQyxHQUNoQyxJQUFJQyxHQUFlLEVBQ25CRixFQUFjRyxTQUFTaEIsSUFDaEJBLEVBQWFVLFNBQVNDLFFBQ3pCSSxHQUFlLEVBQ2pCLElBRUVBLEdBQ0ZELEVBQWFYLFVBQVVDLElBQUlaLEtBQUtHLHNCQUNoQ21CLEVBQWFHLFVBQVcsSUFFeEJILEVBQWFYLFVBQVVLLE9BQU9oQixLQUFLRyxzQkFDbkNtQixFQUFhRyxVQUFXLEVBRTVCLENBRUFDLGtCQUFBQSxHQUNFMUIsS0FBSzJCLGVBQWlCQyxNQUFNQyxLQUMxQjdCLEtBQUtNLE1BQU13QixpQkFBaUI5QixLQUFLQyxpQkFFbkNELEtBQUsrQixjQUFnQi9CLEtBQUtNLE1BQU1YLGNBQWNLLEtBQUtFLHVCQUNuREYsS0FBSzJCLGVBQWVILFNBQVNoQixJQUMzQkEsRUFBYXdCLGlCQUFpQixTQUFVQyxJQUN0Q2pDLEtBQUtpQixvQkFBb0JULEdBQ3pCUixLQUFLb0IsbUJBQW1CcEIsS0FBSzJCLGVBQWdCM0IsS0FBSytCLGNBQWMsR0FDaEUsR0FFTixDQUVBRyxnQkFBQUEsR0FDRWxDLEtBQUtNLE1BQU0wQixpQkFBaUIsVUFBV0MsSUFDckNBLEVBQUlFLGdCQUFnQixJQUV0Qm5DLEtBQUswQixvQkFDUCxDQUVBVSxlQUFBQSxHQUNFcEMsS0FBSzJCLGVBQWVILFNBQVNoQixJQUMzQlIsS0FBS2UsZ0JBQWdCUCxFQUFhLElBRXBDUixLQUFLb0IsbUJBQW1CcEIsS0FBSzJCLGVBQWdCM0IsS0FBSytCLGNBQ3BELEdDM0JGLEVBbERBLE1BQ0VsQyxXQUFBQSxDQUFZd0MsRUFBVUMsRUFBY0MsR0FDbEN2QyxLQUFLd0MsTUFBUUgsRUFBU3JELEtBQ3RCZ0IsS0FBS3lDLE1BQVFKLEVBQVNwRCxLQUN0QmUsS0FBSzBDLGNBQWdCSixFQUNyQnRDLEtBQUsyQyxrQkFBb0JKLENBQzNCLENBRUFLLFlBQUFBLEdBQ0UsT0FBT2xELFNBQ0pDLGNBQWNLLEtBQUswQyxlQUNuQkcsUUFBUWxELGNBQWMsU0FDdEJtRCxXQUFVLEVBQ2YsQ0FFQXBCLGtCQUFBQSxHQUNFMUIsS0FBSytDLFlBQVlmLGlCQUFpQixTQUFTLEtBQ3pDaEMsS0FBSytDLFlBQVlwQyxVQUFVcUMsT0FBTywyQkFBMkIsSUFHL0RoRCxLQUFLaUQsY0FBY2pCLGlCQUFpQixTQUFTLEtBQzNDaEMsS0FBS2tELFNBQVNsQyxRQUFRLElBR3hCaEIsS0FBS21ELFdBQVduQixpQkFBaUIsU0FBUyxLQUN4Q2hDLEtBQUsyQyxrQkFBa0IsQ0FDckIzRCxLQUFNZ0IsS0FBS3dDLE1BQ1h2RCxLQUFNZSxLQUFLeUMsT0FDWCxHQUVOLENBRUFXLE9BQUFBLEdBY0UsT0FiQXBELEtBQUtrRCxTQUFXbEQsS0FBSzRDLGVBRXJCNUMsS0FBSytDLFlBQWMvQyxLQUFLa0QsU0FBU3ZELGNBQWMsc0JBQy9DSyxLQUFLaUQsY0FBZ0JqRCxLQUFLa0QsU0FBU3ZELGNBQWMsd0JBQ2pESyxLQUFLbUQsV0FBYW5ELEtBQUtrRCxTQUFTdkQsY0FBYyxnQkFDOUNLLEtBQUtxRCxXQUFhckQsS0FBS2tELFNBQVN2RCxjQUFjLGdCQUU5Q0ssS0FBS21ELFdBQVdHLElBQU10RCxLQUFLeUMsTUFDM0J6QyxLQUFLbUQsV0FBV0ksSUFBTXZELEtBQUt3QyxNQUMzQnhDLEtBQUtxRCxXQUFXeEMsWUFBY2IsS0FBS3dDLE1BRW5DeEMsS0FBSzBCLHFCQUVFMUIsS0FBS2tELFFBQ2QsR0MvQ2EsTUFBTU0sRUFDbkIzRCxXQUFBQSxDQUFZNEQsR0FDVnpELEtBQUswRCxjQUFnQmhFLFNBQVNDLGNBQWM4RCxHQUM1Q3pELEtBQUsyRCxnQkFBa0IzRCxLQUFLMkQsZ0JBQWdCQyxLQUFLNUQsS0FDbkQsQ0FFQTJELGVBQUFBLENBQWdCMUIsR0FDRSxXQUFaQSxFQUFJNEIsTUFDTjVCLEVBQUlFLGlCQUNKbkMsS0FBSzhELFFBRVQsQ0FFQUMsaUJBQUFBLEdBQ0UvRCxLQUFLMEQsY0FBYzFCLGlCQUFpQixTQUFVQyxLQUUxQ0EsRUFBSStCLE9BQU9yRCxVQUFVc0QsU0FBUyxVQUM5QmhDLEVBQUkrQixPQUFPckQsVUFBVXNELFNBQVMseUJBRTlCakUsS0FBSzhELE9BQ1AsR0FFSixDQUVBSSxJQUFBQSxHQUNFbEUsS0FBSzBELGNBQWMvQyxVQUFVQyxJQUFJLGdCQUNqQ2xCLFNBQVNzQyxpQkFBaUIsVUFBV2hDLEtBQUsyRCxnQkFDNUMsQ0FFQUcsS0FBQUEsR0FDRTlELEtBQUswRCxjQUFjL0MsVUFBVUssT0FBTyxnQkFDcEN0QixTQUFTeUUsb0JBQW9CLFVBQVduRSxLQUFLMkQsZ0JBQy9DLEVDOUJhLE1BQU1TLFVBQXNCWixFQUN6QzNELFdBQUFBLENBQVd3RSxHQUFzQyxJQUFyQyxjQUFFWixFQUFhLGlCQUFFYSxHQUFrQkQsRUFDN0NFLE1BQU1kLEdBQ056RCxLQUFLd0UsV0FBYXhFLEtBQUswRCxjQUFjL0QsY0FBYyxnQkFDbkRLLEtBQUt5RSxrQkFBb0JILEVBQ3pCdEUsS0FBSzJCLGVBQWlCM0IsS0FBSzBELGNBQWM1QixpQkFBaUIsZ0JBQzVELENBRUE0QyxPQUFBQSxHQUNFLE9BQU8xRSxLQUFLd0UsVUFDZCxDQUVBRyxlQUFBQSxHQU1FLE9BTEEzRSxLQUFLNEUsYUFBZSxDQUFDLEVBQ3JCNUUsS0FBSzJCLGVBQWVILFNBQVNxRCxJQUMzQjdFLEtBQUs0RSxhQUFhQyxFQUFNN0YsTUFBUTZGLEVBQU1DLEtBQUssSUFHdEM5RSxLQUFLNEUsWUFDZCxDQUVBRyxjQUFBQSxDQUFlQyxHQUNiaEYsS0FBSzJCLGVBQWVILFNBQVNxRCxJQUN2QkcsRUFBS0gsRUFBTTdGLFFBQ2I2RixFQUFNQyxNQUFRRSxFQUFLSCxFQUFNN0YsTUFDM0IsR0FFSixDQUVBK0UsaUJBQUFBLEdBQ0VRLE1BQU1SLG9CQUVOL0QsS0FBS3dFLFdBQVd4QyxpQkFBaUIsVUFBV0MsSUFDMUNBLEVBQUlFLGlCQUNKbkMsS0FBSzRFLGFBQWU1RSxLQUFLMkUsa0JBQ3pCM0UsS0FBS3lFLGtCQUFrQnpFLEtBQUs0RSxjQUM1QjVFLEtBQUs4RCxPQUFPLEdBRWhCLENBRUFBLEtBQUFBLEdBQ0VTLE1BQU1ULE9BQ1IsQ0FFQW1CLFNBQUFBLEdBQ0VqRixLQUFLd0UsV0FBV1UsT0FDbEIsRUNqQ0YsU0FBU0MsRUFBVzlDLEdBQ2xCLE1BQU0rQyxFQUFPLElBQUlDLEVBQUtoRCxFQUFVLGtCQUFtQkEsSUFDakRpRCxFQUFrQnBCLEtBQUssQ0FBRWpGLEtBQU1vRCxFQUFTcEQsS0FBTUQsS0FBTXFELEVBQVNyRCxNQUFPLElBRXRFLE9BQU9vRyxFQUFLaEMsU0FDZCxDQUlZLElDeEJHLE1BQ2J2RCxXQUFBQSxDQUFXd0UsR0FBeUIsSUFBeEIsUUFBRWtCLEVBQU8sVUFBRUMsR0FBV25CLEVBQ2hDckUsS0FBS3lGLFNBQVdGLEVBQ2hCdkYsS0FBSzBGLFdBQWFGLENBQ3BCLENBRUFHLGVBQUFBLEdBQ0UsT0FBT0MsTUFBTSxHQUFHNUYsS0FBS3lGLGlCQUFrQixDQUNyQ0ksUUFBUyxDQUNQQyxjQUFlOUYsS0FBSzBGLGNBR3JCSyxNQUFNQyxHQUNEQSxFQUFJQyxHQUNDRCxFQUFJRSxPQUVKQyxRQUFRQyxPQUFPLFVBQVVKLEVBQUlLLFlBR3ZDTixNQUFNZixJQUNMc0IsUUFBUUMsSUFBSSxvQkFBcUJ2QixHQUMxQkEsS0FFUndCLE9BQU9DLElBQ05ILFFBQVFJLE1BQU0sbUJBQW9CRCxFQUFJLEdBRTVDLEdERmtCLENBQ2xCbEIsUUFBUyxrREFDVEMsVUFBVyx5Q0FHVEcsa0JBQWtCSSxNQUFNZixJQUMxQnNCLFFBQVFDLElBQUksaUJBQWtCdkIsRUFBSyxJQUdyQyxNQUFNMkIsRUFBbUIsSUFBSXZDLEVBQWMsQ0FDekNYLGNBQWUsc0JBQ2ZhLGlCQUFtQlUsSUFDakI0QixFQUFTQyxZQUFZN0IsRUFBSyxJQUl4QjhCLEVBQWUsSUFBSTFDLEVBQWMsQ0FDckNYLGNBQWUsa0JBQ2ZhLGlCQUFtQmpDLElBQ2pCLE1BQU0wRSxFQUFjNUIsRUFBVzlDLEdBQy9CMkUsRUFBU0MsUUFBUUYsR0FDakJELEVBQWE3QixXQUFXLElBSXRCSyxFQUFvQixJRS9DWCxjQUE2QjlCLEVBQzFDM0QsV0FBQUEsQ0FBWTRELEdBQ1ZjLE1BQU1kLEdBQ056RCxLQUFLa0gsT0FBU2xILEtBQUswRCxjQUFjL0QsY0FBYyx5QkFDL0NLLEtBQUttSCxTQUFXbkgsS0FBSzBELGNBQWMvRCxjQUFjLDBCQUNuRCxDQUVBdUUsSUFBQUEsQ0FBSUcsR0FBaUIsSUFBaEIsS0FBRXBGLEVBQUksS0FBRUQsR0FBTXFGLEVBQ2pCckUsS0FBS21ILFNBQVN0RyxZQUFjN0IsRUFDNUJnQixLQUFLa0gsT0FBTzVELElBQU1yRSxFQUNsQmUsS0FBS2tILE9BQU8zRCxJQUFNdkUsRUFDbEJ1RixNQUFNTCxNQUNSLEdGbUMyQyx3QkFFdkMwQyxFQUFXLElHbkRGLE1BQ2IvRyxXQUFBQSxDQUFXd0UsR0FBZ0QsSUFBL0MsaUJBQUUrQyxFQUFnQix3QkFBRUMsR0FBeUJoRCxFQUN2RHJFLEtBQUtzSCxpQkFBbUI1SCxTQUFTQyxjQUFjeUgsR0FDL0NwSCxLQUFLdUgsd0JBQTBCN0gsU0FBU0MsY0FDdEMwSCxFQUVKLENBRUFHLFdBQUFBLEdBQ0UsTUFBTyxDQUNMQyxTQUFVekgsS0FBS3NILGlCQUFpQnpHLFlBQ2hDNkcsZ0JBQWlCMUgsS0FBS3VILHdCQUF3QjFHLFlBRWxELENBRUFnRyxXQUFBQSxDQUFXYyxHQUFnQyxJQUEvQixTQUFFRixFQUFRLGdCQUFFQyxHQUFpQkMsRUFDdkMzSCxLQUFLc0gsaUJBQWlCekcsWUFBYzRHLEVBQ3BDekgsS0FBS3VILHdCQUF3QjFHLFlBQWM2RyxDQUM3QyxHSGlDNEIsQ0FDNUJOLGlCQUFrQixrQkFDbEJDLHdCQUF5QiwwQkFHckJMLEVBQVcsSUl4REYsTUFDYm5ILFdBQUFBLENBQVd3RSxFQUFzQnVELEdBQW1CLElBQXhDLE1BQUVDLEVBQUssU0FBRUMsR0FBVXpELEVBQzdCckUsS0FBSytILE9BQVNGLEVBQ2Q3SCxLQUFLZ0ksVUFBWUYsRUFDakI5SCxLQUFLaUksV0FBYXZJLFNBQVNDLGNBQWNpSSxFQUMzQyxDQUVBTSxXQUFBQSxDQUFZTCxHQUNWQSxFQUFNckcsU0FBUzJHLElBQ2JuSSxLQUFLZ0ksVUFBVUcsRUFBSyxHQUV4QixDQUVBbEIsT0FBQUEsQ0FBUW1CLEdBQ05wSSxLQUFLaUksV0FBV0ksUUFBUUQsRUFDMUIsR0owQ0EsQ0FDRVAsTUFBTzlJLEVBQ1ArSSxTQUFXekYsSUFDVCxNQUFNMEUsRUFBYzVCLEVBQVc5QyxHQUMvQjJFLEVBQVNDLFFBQVFGLEVBQVksR0FHakMsZ0JBS0ZDLEVBQVNrQixZQUFZbkosR0FJckIsTUFBTXVKLEVBQW9CLElBQUlDLEVBQzVCckosRUFDQXlILEVBQWlCakMsV0FFYjhELEVBQW1CLElBQUlELEVBQzNCckosRUFDQTRILEVBQWFwQyxXQUdmNEQsRUFBa0JwRyxtQkFDbEJzRyxFQUFpQnRHLG1CQUlqQjFDLEVBQVFDLGtCQUFrQnVDLGlCQUFpQixTQUFTLEtBQ2xELE1BQU0sU0FBRXlGLEVBQVEsZ0JBQUVDLEdBQW9CZCxFQUFTWSxjQUMvQ2IsRUFBaUI1QixlQUFlLENBQUUwQyxXQUFVQyxvQkFDNUNZLEVBQWtCbEcsa0JBQ2xCdUUsRUFBaUJ6QyxNQUFNLElBR3pCMUUsRUFBUUksY0FBY29DLGlCQUFpQixTQUFTLEtBQzlDd0csRUFBaUJwRyxrQkFDakIwRSxFQUFhNUMsTUFBTSxJQUtyQm9CLEVBQWtCdkIsb0JBQ2xCNEMsRUFBaUI1QyxvQkFDakIrQyxFQUFhL0MsbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vYXJvdW5kLXRoZS11cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vYXJvdW5kLXRoZS11cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL2Fyb3VuZC10aGUtdXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9hcm91bmQtdGhlLXVzLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vYXJvdW5kLXRoZS11cy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3lvc2VtaXRlLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYWtlIExvdWlzZVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWtlLWxvdWlzZS5qcGdcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvYmFsZC1tb3VudGFpbnMuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGF0ZW1hci5qcGdcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVmFub2lzZSBOYXRpb25hbCBQYXJrXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3Zhbm9pc2UuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkxhZ28gZGkgQnJhaWVzXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhZ28uanBnXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGlvbk9wdGlvbnMgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3NhdmVcIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc2F2ZV9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbnMgPSB7XG4gIGVkaXRQcm9maWxlQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnV0dG9uXCIpLFxuICBhZGRDYXJkQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIiksXG59O1xuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGZvcm1FbGVtZW50KSB7XG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IG9wdGlvbnMuaW5wdXRTZWxlY3RvcjtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IG9wdGlvbnMuc3VibWl0QnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IG9wdGlvbnMuaW5hY3RpdmVCdXR0b25DbGFzcztcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBvcHRpb25zLmlucHV0RXJyb3JDbGFzcztcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gb3B0aW9ucy5lcnJvckNsYXNzO1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtRWxlbWVudDtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbGVtZW50ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGVycm9yTWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgZXJyb3JNZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsZW1lbnQgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JNZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JNZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRFbGVtZW50cywgc3VibWl0QnV0dG9uKSB7XG4gICAgbGV0IGZvdW5kSW52YWxpZCA9IGZhbHNlO1xuICAgIGlucHV0RWxlbWVudHMuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgICBmb3VuZEludmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChmb3VuZEludmFsaWQpIHtcbiAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50cyA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50cy5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2dCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUodGhpcy5faW5wdXRFbGVtZW50cywgdGhpcy5fc3VibWl0QnV0dG9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnRzLmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSh0aGlzLl9pbnB1dEVsZW1lbnRzLCB0aGlzLl9zdWJtaXRCdXR0b24pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoY2FyZERhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xuICAgIHRoaXMuX25hbWUgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcbiAgfVxuXG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2soe1xuICAgICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgICBsaW5rOiB0aGlzLl9saW5rLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRWaWV3KCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgdGhpcy5fY2FyZFRpdGxlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbms7XG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpIHx8XG4gICAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlLWJ1dHRvblwiKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0IH0pIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9wb3B1cEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnRzID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2lucHV0XCIpO1xuICB9XG5cbiAgZ2V0Rm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9wdXBGb3JtO1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIHRoaXMuX2lucHV0VmFsdWVzID0ge307XG4gICAgdGhpcy5faW5wdXRFbGVtZW50cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9pbnB1dFZhbHVlcztcbiAgfVxuXG4gIHNldElucHV0VmFsdWVzKGRhdGEpIHtcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpZiAoZGF0YVtpbnB1dC5uYW1lXSkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXQubmFtZV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlcyA9IHRoaXMuX2dldElucHV0VmFsdWVzKCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2lucHV0VmFsdWVzKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICByZXNldEZvcm0oKSB7XG4gICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIGluaXRpYWxDYXJkcyxcbiAgdmFsaWRhdGlvbk9wdGlvbnMsXG4gIGJ1dHRvbnMsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcbmltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cC5qc1wiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGNhcmREYXRhKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChjYXJkRGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoY2FyZERhdGEpID0+IHtcbiAgICBwcmV2aWV3SW1hZ2VQb3B1cC5vcGVuKHsgbGluazogY2FyZERhdGEubGluaywgbmFtZTogY2FyZERhdGEubmFtZSB9KTtcbiAgfSk7XG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcbn1cblxuLy8gSW5zdGFuY2VzXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGF1dGhUb2tlbjogXCI2MjVhNDMwMy02OWY5LTQ4ZmYtYmI1MS0wOGYzYWM3ZGJkN2NcIixcbn0pO1xuXG5hcGkuZ2V0SW5pdGlhbENhcmRzKCkudGhlbigoZGF0YSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIERhdGE6XCIsIGRhdGEpOyAvLyBMb2cgdGhlIHJlY2VpdmVkIGRhdGEgaW4gdGhlIG1haW4gc2NvcGVcbn0pO1xuXG5jb25zdCBlZGl0UHJvZmlsZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNlZGl0LXByb2ZpbGUtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGRhdGEpID0+IHtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBhZGRDYXJkUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2FkZC1jYXJkLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChjYXJkRGF0YSkgPT4ge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkRGF0YSk7XG4gICAgY2FyZExpc3QuYWRkSXRlbShjYXJkRWxlbWVudCk7XG4gICAgYWRkQ2FyZFBvcHVwLnJlc2V0Rm9ybSgpO1xuICB9LFxufSk7XG5cbmNvbnN0IHByZXZpZXdJbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIik7XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWVTZWxlY3RvcjogXCIucHJvZmlsZV9fdGl0bGVcIixcbiAgdXNlckRlc2NyaXB0aW9uU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIsXG59KTtcblxuY29uc3QgY2FyZExpc3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXG4gICAgcmVuZGVyZXI6IChjYXJkRGF0YSkgPT4ge1xuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY2FyZEVsZW1lbnQpO1xuICAgIH0sXG4gIH0sXG4gIFwiLmNhcmRzX19saXN0XCJcbik7XG5cbi8vIFJlbmRlciBpbml0aWFsIGNhcmRzXG5cbmNhcmRMaXN0LnJlbmRlckl0ZW1zKGluaXRpYWxDYXJkcyk7XG5cbi8vIEZvcm0gdmFsaWRhdGlvblxuXG5jb25zdCBlZGl0Rm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgZWRpdFByb2ZpbGVQb3B1cC5nZXRGb3JtKClcbik7XG5jb25zdCBhZGRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHZhbGlkYXRpb25PcHRpb25zLFxuICBhZGRDYXJkUG9wdXAuZ2V0Rm9ybSgpXG4pO1xuXG5lZGl0Rm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5hZGRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcblxuLy8gRXZlbnQgbGlzdGVuZXJzXG5cbmJ1dHRvbnMuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgeyB1c2VyTmFtZSwgdXNlckRlc2NyaXB0aW9uIH0gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBlZGl0UHJvZmlsZVBvcHVwLnNldElucHV0VmFsdWVzKHsgdXNlck5hbWUsIHVzZXJEZXNjcmlwdGlvbiB9KTtcbiAgZWRpdEZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIGVkaXRQcm9maWxlUG9wdXAub3BlbigpO1xufSk7XG5cbmJ1dHRvbnMuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBhZGRDYXJkUG9wdXAub3BlbigpO1xufSk7XG5cbi8vIFNldCBldmVudCBsaXN0ZW5lcnMgZm9yIHBvcHVwc1xuXG5wcmV2aWV3SW1hZ2VQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuZWRpdFByb2ZpbGVQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuYWRkQ2FyZFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGF1dGhUb2tlbiB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5fYXV0aFRva2VuID0gYXV0aFRva2VuO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgYXV0aG9yaXphdGlvbjogdGhpcy5fYXV0aFRva2VuLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBUEkgQ2FsbCBTdWNjZXNzOlwiLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkFQSSBDYWxsIEZhaWxlZDpcIiwgZXJyKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vICAgZ2V0VXNlckluZm8oKSB7XG5cbi8vICAgfVxuXG4vLyAgIGdldEFwcEluZm8oKSB7XG5cbi8vICAgfVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICB0aGlzLl9jYXB0aW9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3ByZXZpZXctY2FwdGlvblwiKTtcbiAgfVxuXG4gIG9wZW4oeyBsaW5rLCBuYW1lIH0pIHtcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLl9pbWFnZS5zcmMgPSBsaW5rO1xuICAgIHRoaXMuX2ltYWdlLmFsdCA9IG5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgdXNlck5hbWVTZWxlY3RvciwgdXNlckRlc2NyaXB0aW9uU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX3VzZXJOYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlck5hbWVTZWxlY3Rvcik7XG4gICAgdGhpcy5fdXNlckRlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB1c2VyRGVzY3JpcHRpb25TZWxlY3RvclxuICAgICk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlck5hbWU6IHRoaXMuX3VzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIHVzZXJEZXNjcmlwdGlvbjogdGhpcy5fdXNlckRlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8oeyB1c2VyTmFtZSwgdXNlckRlc2NyaXB0aW9uIH0pIHtcbiAgICB0aGlzLl91c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSB1c2VyTmFtZTtcbiAgICB0aGlzLl91c2VyRGVzY3JpcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gdXNlckRlc2NyaXB0aW9uO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICByZW5kZXJJdGVtcyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJpbml0aWFsQ2FyZHMiLCJuYW1lIiwibGluayIsInZhbGlkYXRpb25PcHRpb25zIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJidXR0b25zIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRDYXJkQnV0dG9uIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiZm9ybUVsZW1lbnQiLCJ0aGlzIiwiX2lucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsIl9mb3JtIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbGVtZW50IiwiZXJyb3JNZXNzYWdlRWxlbWVudCIsImlkIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oaWRlSW5wdXRFcnJvciIsInJlbW92ZSIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiaW5wdXRFbGVtZW50cyIsInN1Ym1pdEJ1dHRvbiIsImZvdW5kSW52YWxpZCIsImZvckVhY2giLCJkaXNhYmxlZCIsIl9zZXRFdmVudExpc3RlbmVycyIsIl9pbnB1dEVsZW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIl9zdWJtaXRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiZW5hYmxlVmFsaWRhdGlvbiIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiX25hbWUiLCJfbGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfbGlrZUJ1dHRvbiIsInRvZ2dsZSIsIl9kZWxldGVCdXR0b24iLCJfZWxlbWVudCIsIl9jYXJkSW1hZ2UiLCJnZXRWaWV3IiwiX2NhcmRUaXRsZSIsInNyYyIsImFsdCIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwia2V5IiwiY2xvc2UiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJQb3B1cFdpdGhGb3JtIiwiX3JlZiIsImhhbmRsZUZvcm1TdWJtaXQiLCJzdXBlciIsIl9wb3B1cEZvcm0iLCJfaGFuZGxlRm9ybVN1Ym1pdCIsImdldEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfaW5wdXRWYWx1ZXMiLCJpbnB1dCIsInZhbHVlIiwic2V0SW5wdXRWYWx1ZXMiLCJkYXRhIiwicmVzZXRGb3JtIiwicmVzZXQiLCJjcmVhdGVDYXJkIiwiY2FyZCIsIkNhcmQiLCJwcmV2aWV3SW1hZ2VQb3B1cCIsImJhc2VVcmwiLCJhdXRoVG9rZW4iLCJfYmFzZVVybCIsIl9hdXRoVG9rZW4iLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJlcnJvciIsImVkaXRQcm9maWxlUG9wdXAiLCJ1c2VySW5mbyIsInNldFVzZXJJbmZvIiwiYWRkQ2FyZFBvcHVwIiwiY2FyZEVsZW1lbnQiLCJjYXJkTGlzdCIsImFkZEl0ZW0iLCJfaW1hZ2UiLCJfY2FwdGlvbiIsInVzZXJOYW1lU2VsZWN0b3IiLCJ1c2VyRGVzY3JpcHRpb25TZWxlY3RvciIsIl91c2VyTmFtZUVsZW1lbnQiLCJfdXNlckRlc2NyaXB0aW9uRWxlbWVudCIsImdldFVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VyRGVzY3JpcHRpb24iLCJfcmVmMiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsImVkaXRGb3JtVmFsaWRhdG9yIiwiRm9ybVZhbGlkYXRvciIsImFkZEZvcm1WYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9