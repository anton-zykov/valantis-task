export default class Card {
  constructor ({ brand, id, price, product }) {
    this.brand = brand ?? "";
    this.id = id;
    this.price = price;
    this.product = product;

    this.element = this.createElement();
  }

  createTemplate () {
    return `
      <div class="card">
        <div class="card__id">${this.id}</div>
        <p class="card__title">${this.product}</p>
        <div class="card__description">
          <div class="card__brand">${this.brand}</div>
          <div class="card__price">&#x20bd;${this.price}</div>
        </div>
      </div>
    `;
  }

  createElement () {
    const container = document.createElement('div');
    container.innerHTML = this.createTemplate();
    return container.firstElementChild;
  }

  destroy () {
    this.element.remove();
  }
}
