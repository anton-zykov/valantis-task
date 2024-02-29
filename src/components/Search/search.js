import { getFields } from '../../services/requests';

export default class Search {
  constructor () {
    this.element = this.createElement();
    this.subElements = {
      form: this.element.querySelector('.search__form'),
      input: this.element.querySelector('.search__input'),
      submit: this.element.querySelector('.search__submit'),
    }
    this.subElements.form.addEventListener('submit', this.handleSubmit);

    this.createSwitcher();
  }

  createTemplate () {
    return `
    <div class="search">
      <form class="search__form">
        <div class="search__container"></div>
        <input type="text" name="text" class="search__input" placeholder="Значение поиска" disabled />
        <button type="submit" class="search__submit">Фильтр</button>
      </form>
    </div>
    `;
  }

  createSwitcherTemplate (field) {
    return `
    <input type="radio" name="field" value="${field}" id="search-${field}" class="search__controller" />
    <label for="search-${field}" class="search__switcher">${field}</label>
    `;
  }

  createElement () {
    const container = document.createElement('div');
    container.innerHTML = this.createTemplate();
    return container.firstElementChild;
  }

  async createSwitcher () {
    const response = await getFields();
    this.element.querySelector('.search__container').innerHTML = [
      this.createSwitcherTemplate('no-filter'),
      ...response.result.map((field) => this.createSwitcherTemplate(field))
    ].join(' ');

    this.createListenersForSwitchers();
  }

  handleOptionChange = (event) => {
    if (event.target.value === 'no-filter') {
      this.subElements.input.setAttribute('disabled', '');
    } else {
      this.subElements.input.removeAttribute('disabled');
    }
  }

  createListenersForSwitchers () {
    this.element.querySelectorAll('.search__controller')
      .forEach((controller) => {
        controller.addEventListener('change', this.handleOptionChange)
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(this.subElements.form);
    const field = formData.get('field');
    const value = field === 'price'
      ? +formData.get('text')
      : formData.get('text');
    if (field === 'no-filter') {
      document.dispatchEvent(
        new CustomEvent('filter-reset', { bubbles: true })
      );
    } else {
      document.dispatchEvent(
        new CustomEvent('filter-set', { 
          detail: {
            field,
            value,
          },
          bubbles: true,
        })
      );
    }
  }
}
