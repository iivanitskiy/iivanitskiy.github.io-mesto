const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';

import './pages/index.css';

import {Card, placeCardLikeIcon, placeCardLikeIconLiked} from './js/card.js';
import {CardList, placesList} from './js/cardlist.js';
import {Api} from './js/api.js';
import {Popup, popup, popupClose, popupButton, } from './js/popup.js';
import {popupForm, popupInputName, popupInputLink} from './js/popupform.js';
import {popupEdit, popupEditClose, popupEditButton} from './js/popupEdit.js';
import {popupEditInputName, popupEditInputJob, popupEditForm} from './js/popupEditForm.js';
import {popupCard, popupCardContent, popupCardClose} from './js/popupCard.js';
import {userAvatar, userName, userJob, editButton, AddButton} from './js/mainPage.js';
import {error, errorAlert, errorMsg, errorAlertEdit, errorMsgEdit} from './js/error.js';

const newPopup = new Popup(popup);
const editPopup = new Popup(popupEdit);
const cardPopup = new Popup(popupCard);
const cardList = new CardList(placesList, [])

// Кнопки ->
AddButton.addEventListener('click', function () {
  newPopup.open();
});

popupButton.addEventListener('click', function () {
  newPopup.close();
});

editButton.addEventListener('click', function () {
  editPopup.open();
});

popupEditButton.addEventListener('click', function () {
  editPopup.close();
});
// <- Кнопки

// Всплывающие карточки ->
placesList.addEventListener('click', function () {
  if (event.target.classList.contains('place-card__image')) {
    const oldImage = document.querySelector('.popup-card-image');
    if (oldImage) {
      popupCardContent.removeChild(oldImage)
    }
    const image = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "")
    const divImage = document.createElement('img')
    divImage.setAttribute('src', image);
    divImage.classList.add('popup-card-image');
    popupCardContent.appendChild(divImage)
    cardPopup.open();
  }
});
// <- Всплывающие карточки

// Формы ->
popupForm.addEventListener('submit', function(event) {  
  event.preventDefault();
  api.postNewCard({name: popupInputName.value, link: popupInputLink.value}).then(res => {
    cardList.addCard(new Card(res));
    popup.classList.remove('popup_is-opened');
  });
});

popupForm.addEventListener('input', function () {
    if (popupInputName.value.length <= 1 || popupInputLink.value.length <= 0) {
    popupButton.setAttribute('disabled', true);
    } else if (popupInputName.value.length > 30 || popupInputLink.value.length > 200) {
        popupButton.setAttribute('disabled', true); 
    } else if (popupInputLink.validity.typeMismatch) {
      errorMsg.textContent = 'Здесь должна быть ссылка',
      errorMsg.style.visibility = 'visible';
      popupButton.setAttribute('disabled', true); 
    } else {
      errorMsg.style.visibility = 'hidden';
      popupButton.removeAttribute('disabled')
    }
});

popupEditForm.addEventListener('submit', function(event) { 
    event.preventDefault();
    userJob.textContent = popupEditInputJob.value;
    userName.textContent = popupEditInputName.value;
    popupEdit.classList.remove('popup-edit_is-opened');
    popupEditButton.textContent = 'Загрузка...';
    api.patchEditForm();
});

popupEditForm.addEventListener('input', function () {
    if (popupEditInputName.value.length <= 1 || popupEditInputJob.value.length <= 1) {
    popupEditButton.setAttribute('disabled', true);
    } else if (popupEditInputName.value.length > 30 || popupEditInputJob.value.length > 30) {
        popupEditButton.setAttribute('disabled', true);
    } else {
    popupEditButton.removeAttribute('disabled');
    }
});
// <- Формы

error(popupEditForm, popupEditInputName, errorAlertEdit);
error(popupEditForm, popupEditInputJob, errorMsgEdit);
error(popupForm, popupInputName, errorAlert);

function info(item) {
  userName.textContent = item.name,
  userJob.textContent = item.about,
  userAvatar.style.backgroundImage = `url(${item.avatar})`
}

function inCards(item) {
  item.map((card) => new Card(card)).forEach((card) => cardList.addCard(card));
}

export const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '860e5df7-67da-4971-ba43-fe69e85865bc',
    'Content-Type': 'application/json'
  }
});

api.getInfo().then((response) => info(response));
api.getInitialCards().then((response) => inCards(response))