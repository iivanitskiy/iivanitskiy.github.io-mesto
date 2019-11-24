export class CardList {
  constructor(container, initialCards) { 
    this.container = container;
    this.cards = initialCards;
    this.render()
  }
  addCard(card) {
      this.cards.push(card); 
      this.container.appendChild(card.create());
  }
  render() {
    this.cards.forEach((card) => this.container.appendChild(card.create()));
  }
}

export const placesList = document.querySelector('.places-list');