
import { card } from "../components/card.js";
window.customElements.define('skill-card', card);


// import { getCookie } from "../js/app.js";
// const accessToken = getCookie("accessToken");

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        return null;
    }
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
    .then((res) => res.json(res))
    .then((response) => {
        console.log("Skills data:", response);
        displaySkills(response);
    })
    .catch((error) => {
      console.error("Error fetching skills data:", error);
    });
} else {
  console.error("No access token found. Redirecting to login page.");
  window.location.href = "../index.html";
}

function displaySkills(skills) {
  const skillsContainer = document.getElementById("skills-container");
  skills.forEach((skill) => {
    const card = document.createElement("skill-card");
    card.shadowRoot.querySelector(".card-title").textContent = skill.name;
    card.shadowRoot.querySelector(".card-body p").textContent =
          skill.description;
       card.shadowRoot.querySelector(".card-duration").textContent = "Duration of quiz : "+skill.duration+"min";
      skillsContainer.appendChild(card);
      console.log(card);
      
  });
}

//Skills data:  [{…}, {…}, {…}, {…}]
//1: { id: 2, name: 'alias', duration: 7, description: 'Laboriosam est voluptatem distinctio saepe officia rerum.', status: 1, … };
//2: { id: 3, name: 'sint', duration: 5, description: 'Deleniti veritatis dolores placeat aut odit aut.', status: 1, … };
//3: { id: 5, name: 'autem', duration: 16, description: 'Quam et est fuga ea corporis est quia repellat.', status: 1, … };

 // console.log(response[0].name);
