class TogglePushButton extends HTMLElement {
  static get observerdAttributes() {
    return [`pressed`];
  }

  get pressed() {
    return this.hasAttribute(`pressed`);
  }
  set pressed(isPressed) {
    // currently this is a boolean attribute and not a tri-state one
    if (isPressed) {
      this.setAttribute(`pressed`, ``);
      this.setAttribute(`aria-pressed`, `true`);
    } else {
      this.removeAttribute(`pressed`);
      this.setAttribute(`aria-pressed`, `false`);
    }
  }

  get disabled() {
    return this.hasAttribute(`disabled`);
  }
  set disabled(isDisabled) {
    if (isDisabled) {
      this.setAttribute(`disabled`, ``);
      this.setAttribute(`aria-disabled`, `true`);
    } else {
      this.removeAttribute(`disabled`);
      this.setAttribute(`aria-disabled`, `false`);
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
      if (!this.disabled) {
        this.activate();
      }
    });

    this.addEventListener(`keypress`, event => {
      if (!this.disabled) {
        switch (event.key) {
          case 'Enter':
          case ' ': // Space key
            this.activate();
            break;
        }
      }
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
