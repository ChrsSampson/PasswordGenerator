import Input from "./Input.js";

// convience alias
const qa = document.querySelectorAll.bind(document);
const qs = document.querySelector.bind(document);
const ce = document.createElement.bind(document);
const c = console.log;
const w = console.warn;

class App {
  constructor(target = qs("body")) {
    this.target = target;
    this.params = {
      length: 8,
      uppercase: true,
      lowercase: false,
      number: false,
      symbol: false,
    };
    this.password = "";
    this.init();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createShell() {
    // shell
    const appContainer = ce("main");
    appContainer.className = "app-container";
    // header
    const header = ce("header");
    header.className = "app-header";
    const h1 = ce("h1");
    h1.textContent = "Password Generator";
    header.appendChild(h1);
    // output
    const outputContainer = ce("div");
    outputContainer.className = "output-container";
    header.appendChild(outputContainer);

    // form
    const form = ce("form");
    form.className = "app-form";
    form.addEventListener("submit", (e) => this.handleSubmit(e));

    const containers = ["length", "uppercase", "lowercase", "number", "symbol"];
    // input containers
    containers.forEach((container) => {
      const node = ce("div");
      node.className = `${container}-container`;
      form.appendChild(node);
    });

    // submit button
    const submit = ce("button");
    submit.className = "submit";
    submit.textContent = "Generate";
    form.appendChild(submit);

    // append parts to container
    appContainer.appendChild(header);
    appContainer.appendChild(form);

    // append all that to the body
    this.target.appendChild(appContainer);
  }

  createInputs() {
    const specs = [
      {
        selector: ".output-container",
        type: "text",
        props: {
          disabled: true,
          id: "output",
          value: this.password,
        },
      },
      {
        selector: ".output-container",
        type: "button",
        props: {
          id: "copy",
          class: "button copy-button",
          value: "Copy",
        },
        event: "click",
        callback: (e) => {
          navigator.clipboard.writeText(this.password);
        },
      },
      {
        selector: ".length-container",
        type: "range",
        props: {
          min: 8,
          max: 20,
          value: 8,
          label: "Length",
        },
        event: "change",
        callback: (e) => {
          this.params.length = e.target.value;
        },
      },
      {
        selector: ".uppercase-container",
        type: "checkbox",
        props: {
          label: "User Uppercase",
          checked: this.params.uppercase,
        },
        event: "change",
        callback: (e) => {
          this.params.uppercase = e.target.checked;
        },
      },
      {
        selector: ".lowercase-container",
        type: "checkbox",
        props: {
          label: "User Lowercase",
          checked: this.params.lowercase,
        },
        event: "change",
        callback: (e) => {
          this.params.lowercase = e.target.checked;
        },
      },
      {
        selector: ".number-container",
        type: "checkbox",
        props: {
          label: "User Numbers",
          checked: this.params.number,
        },
        event: "change",
        callback: (e) => {
          this.params.number = e.target.checked;
        },
      },
      {
        selector: ".symbol-container",
        type: "checkbox",
        props: {
          label: "User Symbols",
          checked: this.params.symbol,
        },
        event: "change",
        callback: (e) => {
          this.params.symbol = e.target.checked;
        },
      },
    ];

    specs.forEach((spec) => {
      const t = qs(spec.selector);
      const i = new Input(t, spec.type, spec.props, spec.event, spec.callback);
    });
  }

  init() {
    // create the app
    this.createShell();
    this.createInputs();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.generate(this.params);
  }

  setPassword(str) {
    // setter fucntion for password state changes
    this.password = str;
    const output = qs("#output");
    output.value = this.password;
  }

  generate(params) {
    // sub sets of characters
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let chars = "";
    const { length, uppercase, lowercase, number, symbol } = params;

    if (!uppercase && !lowercase && !number && !symbol) {
      this.setPassword("Please select at least one character set");
      return;
    }

    let collection = "";
    if (uppercase) collection += upperChars;
    if (lowercase) collection += lowerChars;
    if (number) collection += numbers;
    if (symbol) collection += symbols;

    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * collection.length);
      chars += collection[randIndex];
    }

    this.setPassword(chars);
  }
}

const app = new App();
