// lazy Input
class Input {
  constructor(
    target,
    type = "text",
    obj,
    event = "intput",
    eventHandler = () => {}
  ) {
    this.node = "";
    this.target = target;
    this.type = type;
    this.props = obj;
    this.event = event;
    this.eventHandler = eventHandler;
    this.init();
  }

  init() {
    if (!this.target) {
      const err = new Error(
        "Input: target is required and must be a DOM element"
      );
      throw err;
    }

    this.node = document.createElement("input");
    this.node.type = this.type;
    // apply props
    for (let key in this.props) {
      if (this.props[key]) {
        this.node[key] = this.props[key];
      }
    }

    if (this.props.label) {
      let label = document.createElement("label");
      label.textContent = this.props.label;
      this.target.appendChild(label);
    }

    this.node.addEventListener(this.event, (e) => this.eventHandler(e));

    this.target.appendChild(this.node);
  }
}

export default Input;
