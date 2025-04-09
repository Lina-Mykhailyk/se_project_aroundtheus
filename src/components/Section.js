export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, prepend = false) {
    if (prepend) {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }
}
