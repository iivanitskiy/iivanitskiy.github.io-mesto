const AddButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__button-edit');

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupButton = document.querySelector('.popup__button');

const popupEditClose = document.querySelector('.popup-edit__close');
const popupEdit = document.querySelector('.popup-edit');
const popupEditButton = document.querySelector('.popup-edit__button');
const popupEditInputName = document.querySelector('.popup-edit__input_type_name');
const popupEditInputJob = document.querySelector('.popup-edit__input_type_job');
const popupEditForm = document.querySelector('.popup-edit__form');

const popupCard = document.querySelector('.popup-card');
const popupCardContent = document.querySelector('.popup-card__content');
const popupCardClose = document.querySelector('.popup-card__close');

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const errorAlert = document.querySelector('.error-alert');
const errorMsg = document.querySelector('.error-msg');
const errorAlertEdit = document.querySelector('.error-alert-edit');
const errorMsgEdit = document.querySelector('.error-msg-edit');
const userAvatar = document.querySelector('.user-info__photo');

class Popup {
  constructor(container) {
    this.container = container
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close)
  }
  open() {
    this.container.classList.add('popup_is-opened');
  }
  close() {
    this.container.classList.remove('popup_is-opened')
  }
}

const newPopup = new Popup(popup);
const editPopup = new Popup(popupEdit);
const cardPopup = new Popup(popupCard);

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
  api.postNewCard({name: popupInputName.value, link: popupInputLink.value});
  cardList.addCard(new Card());
  popup.classList.remove('popup_is-opened');
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

function error(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    } else if (item.value.length < 2 || item.value.length > 30) {
      err.textContent = 'Должно быть от 2 до 30 символов',
      err.style.visibility = 'visible';
    } else {
      err.style.visibility = 'hidden';
    }
  });
}

error(popupEditForm, popupEditInputName, errorAlertEdit);
error(popupEditForm, popupEditInputJob, errorMsgEdit);
error(popupForm, popupInputName, errorAlert);
// <- Формы

class Api {
  constructor(options) {
    this.options = options;
  }
  getInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers })
      .then(res => {
        if (res.ok) {          
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);  
      })
      .catch((err) => {
        console.log(err);
      })
    }

  patchEditForm() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: popupEditInputName.value,
        about: popupEditInputJob.value
      })
    })
      .then(res => {
        console.log(res.ok);
      })
      .catch((err) => {
        console.log(err);     
    });
  }  
  
  postNewCard(card) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(card)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      .then(res => {
        console.log(res.ok);
      })
      .catch((err) => {
        console.log(err);     
    });
  }  

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then(res => {
        console.log(res.ok);
      })
      .catch((err) => {
        console.log(err);     
    });
  }
}

const cardList = new CardList(placesList, [])

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort4',
  headers: {
    authorization: '860e5df7-67da-4971-ba43-fe69e85865bc',
    'Content-Type': 'application/json'
  }
});

function info(item) {
  userName.textContent = item.name,
  userJob.textContent = item.about,
  userAvatar.style.backgroundImage = `url(${item.avatar})`
}

api.getInfo().then((response) => info(response));

function inCards(item) {
  item.map((card) => new Card(card)).forEach((card) => cardList.addCard(card));
}

api.getInitialCards().then((response) => inCards(response))

/**
 * Здравствуйте 
 * 
 * Вы передаёте в класс API 
 * http://95.216.175.5/cohort4/cards/ и authorization
 * Но при этом у вас он прописан в классе. Надо удалять из класса вкю информацию которая относится параметрам
 * 
 * Класс API ничего не должен знать о кнопках или о DOM
 * Вот это всё надо удалить из класса
 *     popupEditButton.textContent = 'Сохранить';
 * 
 * Вот это 
 *         cardList.addCard(new Card(data));
 * Вот это
 *         data.map((card) => new Card(card)).forEach((card) => cardList.addCard(card));
 * вот это 
 *      userName.textContent = data.name;
        userJob.textContent = data.about;
        userAvatar.style.backgroundImage = `url(${data.avatar})`;
        и так далее
 * Всё это должно исполнятся в классах которые были реализованы в 8 спринте или в функциях. 
 * 
 * Жду ваши исправления
 * 
 */

/**
 * Работа принимается
 * 
 * 
 */