export class Popup {
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

export const popup = document.querySelector('.popup');
export const popupClose = document.querySelector('.popup__close');
export const popupButton = document.querySelector('.popup__button');