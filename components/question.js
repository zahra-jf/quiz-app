const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="../dist/Bootstrap/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="../dist/Bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" href="../components/question.css" />
    <div class="container">
      <div class="q-header">
        <div class="Remaining-q">1/10</div>
        <div class="time-left">Time left: 100s</div>
      </div>

      <div class="q-container">
        <div class="q-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing eli Sunt impedit?
        </div>
        <div class="options">
          <div class="option option-1">
            <i class=" "></i>
            <p class="option-text">1. Lorem ipsum</p>
          </div>
          <div class="option option-2">
            <i class=""></i>
            <p class="option-text">2. Lorem ipsum dolor</p>
          </div>
          <div class="option option-3">
            <i class=""></i>
            <p class="option-text">3. Lorem ipsum dolor sit</p>
          </div>
          <div class="option option-4">
            <i class=""></i>
            <p class="option-text">4. Lorem, ipsum</p>
          </div>
        </div>
      </div>

      <div class="q-btns " >
        <button class="pre btn btn-dark">Previous</button>
        <button class="next btn btn-dark">next</button>
      </div>
    </div>
`;

class Course extends HTMLElement {
  constructor() {
    super()

    this.toggleInfo = false

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    }
    }