import { getIDs, getItems, filterProducts } from '../../services/requests';
import Card from '../Card/Card';

const arrow = '<svg fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/></svg>';

export default class Page {
  constructor ({ offset = 0, page = 0, limit = 50, filter = {} } = {}) {
    this.offset = offset;
    this.page = page;
    this.limit = limit;
    this.filter = filter;

    this.allIDs = [];
    this.products = [];
    this.cards = [];
    this.element = this.createElement();
    this.subElements = {
      left: this.element.querySelector('.page__nav_left'),
      right: this.element.querySelector('.page__nav_right'),
      main: this.element.querySelector('.page__main'),
    };

    this.loadIDs().then(() => this.render());
    this.createFilterListeners();
  }

  createTemplate () {
    return `
    <div class="page">
      <nav class="page__nav page__nav_left">
        <div class="page__nav-link">${arrow}</div>
      </nav>
      <main class="page__main"></main>
      <nav class="page__nav page__nav_right">
        <div class="page__nav-link">${arrow}</div>
      </nav>
    </div>
    `;
  }

  createElement () {
    const container = document.createElement('div');
    container.innerHTML = this.createTemplate();
    return container.firstElementChild;
  }

  deleteDuplicates (ids) {
    const idset = new Set(ids);
    return Array.from(idset);
  }

  async loadIDs () {
    const response = this.filter.field
      ? await filterProducts(this.filter.field, this.filter.value)
      : await getIDs();
    this.allIDs = this.deleteDuplicates(response.result);
  }

  async loadProducts () {
    const ids = this.allIDs.slice(this.page * this.limit, (this.page + 1) * this.limit)
    this.products = (await getItems(ids)).result;
  }

  async render () {
    this.destroyCards();
    this.deactivateNavigation();
    if (this.page === 0) this.subElements.left.setAttribute('disabled', '');
    else this.subElements.left.removeAttribute('disabled');

    await this.loadProducts();
    this.cards = this.products.map((product) => new Card(product));
    this.subElements.main.append(
      ...this.cards.map((card) => card.element)
    );

    this.activateNavigation();
  }

  handleLeftArrowClick = () => {
    this.page -= 1;
    this.offset = this.page * this.limit;
    this.render();
  }

  handleRightArrowClick = () => {
    this.page += 1;
    this.offset = this.page * this.limit;
    this.render();
  }

  activateNavigation () {
    this.subElements.left.addEventListener('click', this.handleLeftArrowClick);
    this.subElements.right.addEventListener('click', this.handleRightArrowClick);
  }

  deactivateNavigation () {
    this.subElements.left.removeEventListener('click', this.handleLeftArrowClick);
    this.subElements.right.removeEventListener('click', this.handleRightArrowClick);
  }

  createFilterListeners () {
    const handleFilterChange = (event) => {
      this.page = 0;
      this.offset = 0;
      if (event.type === 'filter-reset') this.filter = {};
      else {
        this.filter = {
          field: event.detail.field,
          value: event.detail.value,
        };
      }
      this.loadIDs().then(() => this.render());
    };

    document.addEventListener('filter-reset', handleFilterChange);
    document.addEventListener('filter-set', handleFilterChange);
  }

  destroyCards () {
    this.cards.forEach((card) => card.destroy());
    this.cards = [];
    this.products = [];
  }
}