const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="../dist/Bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" href="../dist/Bootstrap/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="../navbar/navbar.css">
 <style>
:root {
    --clr-bg: #bbc7e0;
    --clr-light: #EDE8F5;
    --clr-dark: #3D52A0;
    --clr-mid: #7091e6;
}
nav {
    justify-content: space-between;
    align-items: center;
    background-color: #3D52A0;
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem;
    position: fixed;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 4;
    margin-top: 0;
}

.left-nav {
    gap: 1rem;
    font-size: 1.3rem;
}


.log-Out,
.home,
.about {
    color: #bbc7e0;
}

.logo {
    color: var(--clr-light);
}

.log-Out,
.home,
.about:hover {
    cursor: pointer;

}


.log-Out:hover {
    color: var(--clr-light);
}

.home:hover {
    color: var(--clr-light);
}

.about:hover {
    color: var(--clr-light);
}
</style>
   <nav class="d-flex">
      <div class="logo d-flex">
        <h3 class="logo">QUIZ</h3>
        <i class=""></i>
      </div>
      <div class="left-nav d-flex">
        <div class="log-Out">log-Out</div>
        <div class="home">home</div>
        <div class="about">about</div>
      </div>
    </nav>
`;

class navbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListeners();
  }

  addEventListeners() {
    const homeButton = this.shadowRoot.querySelector(".home");
    homeButton.addEventListener("click", () => {
        window.location.href = "../../htmls/select.html";
      });
  
  }
}

export { navbar };


