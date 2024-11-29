import { navbar } from "../components/navbar/navbar.js";
window.customElements.define("nav-bar", navbar);

const params = new URLSearchParams(window.location.search);
const score = params.get("score");

let correctText = document.getElementById("correct");

document.addEventListener("DOMContentLoaded", () => {
  correctText.innerHTML = score;
});

let restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
  window.location.href = `../htmls/select.html`;
});
