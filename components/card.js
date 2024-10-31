const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="../dist/Bootstrap/bootstrap.min.css" />
  <link rel="stylesheet" href="../dist/Bootstrap/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="../components/card.css" />
  
  <div class="card flipCard col-3 ">
    <div class="content">
      <div class="front front-card">
        <img src="../imgs/js.png" class="card-img-top" alt="Skill Logo" />
        <div class="card-body">
          <h5 class="card-title"></h5>
          <div class="cont-icons"></div>
        </div>
      </div>
      <div class="back back-card">
        <div class="card-body card-body-back">
          <h5 class="card-duration"></h5>
          <p class="card-description"></p>
      </div>
      </div>
    </div>
    <div class="icons" id="icons">
      <span class="icon-text">Level of difficulty:</span>
      <div class="dynamic-icons" id="dynamic-icons"></div>
    </div>
  </div>
  <a href="#" class="btn btn-primary">
  Start Quiz
 </a>
`;

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.selectDifficulty = null;

  
  }
  }





// connectedCallback() {
//   const skillName = this.getAttribute("data-skill");
//   const skillId = this.getAttribute("data-id");
//   const difficulties = JSON.parse(this.getAttribute("data-difficulties"));

//   // this.shadowRoot.querySelector(".card-title").textContent = skillName;
//   this.createIcons(difficulties);
// }

// createIcons(difficulties) {
//   const iconsContainer = this.shadowRoot.querySelector(".dynamic-icons");
//   iconsContainer.innerHTML = "";

//   difficulties.forEach((difficulty, index) => {
//     const icon = document.createElement("i");
//     icon.classList.add("bi", `bi-${index}-circle-fill`, "icons" );
//     icon.addEventListener("click", () => {
//       this.selectedDifficulty = difficulty;
//       console.log(`Selected difficulty: ${difficulty}`);
//     });
//     iconsContainer.appendChild(icon);
//   });
// }

// startExam() {
//   if (this.selectedDifficulty) {
//     window.location.href = `../htmls/question.html?skill_id=${this.selectedDifficulty.id}`;
//   } else {
//     alert("لطفاً درجه سختی را انتخاب کنید.");
//   }
// }
// }

// window.customElements.define("skill-card", Card);
export { Card };
