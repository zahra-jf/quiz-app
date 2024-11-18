import { Card } from "../components/card.js";

if (!customElements.get("skill-card")) {
  window.customElements.define("skill-card", Card);
}

let selectedSkillId = null;
let durationMinutes=null

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const accessToken = getCookie("accessToken");

if (accessToken) {
  fetch("http://127.0.0.1:8000/api/v1/skills", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())

    .then((response) => {
      displaySkills(response);
    })

    .catch((error) => {
      console.error("Error fetching skills data:", error);
    });
} else {
  console.error("No access token found. Redirecting to login page.");
  window.location.href = "../index.html";
}

function displaySkills(skillsGrouped) {
  for (const tag in skillsGrouped) {
    const skills = skillsGrouped[tag];
    // console.log(skills);

    const card = document.createElement("skill-card");
    const skillsContainer = document.getElementById("skills-container");

    card.shadowRoot.querySelector(".card-title").textContent =
      tag.toUpperCase();

    skills.forEach((item) => {
      
     

      const iconsContainer = card.shadowRoot.querySelector(".dynamic-icons");
      iconsContainer.insertAdjacentHTML(
        "beforeend",
        `<i class="bi bi-${item.difficulty}-circle-fill icon" id=${item.id} data-duration=${item.duration} ></i>`
      );
    });

    const icons = card.shadowRoot.querySelectorAll(".icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        icons.forEach((i) => i.classList.remove("selected"));

        const clickedIcon = event.target;
        clickedIcon.classList.add("selected");
        selectedSkillId = icon.id;
        durationMinutes=icon.dataset.duration
        console.log(icon);
        
console.log(durationMinutes);

        console.log(selectedSkillId);
      });
    });

    const skillContent = skills
      .map((skill) => {
        return `
                <div class="skill-detail">
                    <p>${skill.name} </p>
                    <p>Duration: ${skill.duration} min</p>
                    <p> ${skill.description} </p>
                </div>
            `;
      })
      .join("");

    card.shadowRoot.querySelector(".card-body-back").innerHTML = skillContent;
    skillsContainer.appendChild(card);

    card.shadowRoot
      .querySelector(".btn-primary")
      .addEventListener("click", () => {
        if (selectedSkillId) {
          window.location.href = `../htmls/question.html?skillId=${selectedSkillId}&duration=${durationMinutes}`;
        } else {
          alert("Please select one of the difficulty levels");
        }
      });
  }
}


function getDifficultyLabel(difficulty) {
  switch (difficulty) {
    case 0:
      return "Easy";
    case 1:
      return "Medium";
    case 2:
      return "Hard";
    default:
      return "Unknown";
  }
}

