import {api} from '../index.js';

export class Card {
  constructor(item) {
    this.item = item;
  }
  create() {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardDeleteIcon = document.createElement('button');
    const placeCardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeIcon = document.createElement('button');
  
    placeCard.className = 'place-card';
    placeCardImage.className = 'place-card__image';
    placeCardDeleteIcon.className = 'place-card__delete-icon';
    placeCardDescription.className = 'place-card__description';
    placeCardName.className = 'place-card__name';
    placeCardLikeIcon.className = 'place-card__like-icon';
  
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    placeCardName.textContent = this.item.name;
    placeCardImage.setAttribute('style', `background-image: url(${this.item.link})`);

    placeCardDeleteIcon.addEventListener('click', this.remove(this.item._id));
    placeCardLikeIcon.addEventListener('click', this.like);

    return placeCard;
  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked')};
  }
  remove(cardId) {
    return function(event) {
      event.target.parentNode.parentNode.remove();
      api.deleteCard(cardId);
    }
  }
}

export const placeCardLikeIcon = document.querySelector('.place-card__like-icon');
export const placeCardLikeIconLiked = document.querySelector('.place-card__like-icon_liked');