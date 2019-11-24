import {popupEditInputName, popupEditInputJob} from './popupEditForm.js';

export class Api {
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