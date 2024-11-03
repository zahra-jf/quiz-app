function getSkillIdAndDurationFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    skillId: params.get("skillId"),
    duration: parseInt(params.get("duration"), 10) * 60,
  };
}


const { skillId, duration } = getSkillIdAndDurationFromURL();
let timeLeft = duration;

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

let currentQuestionIndex = 0;
let questions = [];

function displayQuestion(index) {
  const questionTextElement = document.getElementById("q-text");
  const optionsContainer = document.getElementById("options-container");
  const question = questions[index];
  questionTextElement.textContent = question.title;
  optionsContainer.innerHTML = "";
     let i = 0;
  question.options.forEach((option) => {
    i++
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent =i+"- "+ option.text;
    optionsContainer.appendChild(optionElement);
  });
}

if ((skillId && accessToken)) {
       fetch(
         `http://127.0.0.1:8000/api/v1/skills/questions?skill_id=${skillId}`,
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${accessToken}`,
             "Content-Type": "application/json",
           },
         }
       )
         .then((res) => res.json())
         .then((response) => {
           questions = response.data.questions;
          
           
           displayQuestion(currentQuestionIndex); 
         })
         .catch((error) => {
           console.error("Error fetching questions:", error);
         });
}

let remainingQ = document.getElementById("remaining-q");
let r=1
 remainingQ.innerHTML=r+"/10"
 
  
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
     r++;
     remainingQ.innerHTML = r + "/10";
  }
  
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
     r--;
     remainingQ.innerHTML = r + "/10";
  }
});



if (skillId && accessToken) {
  fetch(`http://127.0.0.1:8000/api/v1/skills/questions?skill_id=${skillId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      questions = response.data.questions;
    

      displayQuestion(currentQuestionIndex);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
}


function startCountdown() {
  const timerElement = document.getElementById("timer");

  const interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      alert("زمان شما به پایان رسید!");
      // می‌توانید کارهای دیگری مثل پایان آزمون یا ارسال خودکار پاسخ‌ها را هم اینجا انجام دهید.
    }
    timeLeft--;
  }, 1000);
}

startCountdown();






