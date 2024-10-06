const template = document.createElement("template");
template.innerHTML = `
   
`;

class Course extends HTMLElement {
  constructor() {
    super();

    this.toggleInfo = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
