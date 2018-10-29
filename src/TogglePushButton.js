class TogglePushButton extends HTMLElement {
  static get observerdAttributes() {
    return [`pressed`];
  }

  get pressed() {
    return this.hasAttribute(`pressed`);
  }
  set pressed(value) {
    // currently this is a boolean attribute and not a tri-state one
    if (value) {
      this.setAttribute(`pressed`, ``);
      this.setAttribute(`aria-pressed`, `true`);
    } else {
      this.removeAttribute(`pressed`);
      this.setAttribute(`aria-pressed`, `false`);
    }
  }

  constructor() {
    super();
  }

  activate() {
    this.pressed = !this.pressed;
  }

  addListeners() {
    this.addEventListener(`click`, event => {
      this.activate();
    });
  }

  connectedCallback() {
    this.pressed;
    this.tabIndex = 0;
    this.setAttribute(`role`, `button`);
    this.addListeners();
  }

  disConnectedCallback() {
    this.tabIndex = -1; // todo
    // need to remove listeners?
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }
}

export default TogglePushButton;
