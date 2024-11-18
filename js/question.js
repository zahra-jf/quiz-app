function getSkillIdAndDurationFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    skillId: params.get("skillId"),
    duration: parseInt(params.get("duration"), 10) * 60,
  };
}

const { skillId, duration } = getSkillIdAndDurationFromURL();
let timeLeft = duration;

startCountdown();

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

const nextButton = document.getElementById("next-btn");
const endButton = document.getElementById("end-btn");
const prevButton = document.getElementById("prev-btn");

endButton.style.display = "none";

function displayQuestion(index) {
  const questionTextElement = document.getElementById("q-text");
  const optionsContainer = document.getElementById("options-container");
  const question = questions[index];

  questionTextElement.textContent = question.title;
  optionsContainer.innerHTML = "";

  let i = 0;
  question.options.forEach((option) => {
    i++;
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.setAttribute("id", option.id);
    // optionElement.setAttribute("onclick", `selectOption(this)`);

    optionElement.addEventListener("click", () => selectOption(optionElement));

    optionElement.textContent = i + "- " + option.text;
    optionsContainer.appendChild(optionElement);
  });

  currentQuestionIndex = index;
  if (index === questions.length - 1) {
     nextButton.style.display = "none";
    endButton.style.display = "inline-block";
  } else {
     nextButton.style.display = "inline-block";
    endButton.style.display = "none";
  }
}

let selectedOptionId = null;
function selectOption(selectedOption) {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.classList.remove("selected");
  });

  selectedOption.classList.add("selected");

  selectedOptionId = selectedOption.id;
}

let quizId = null;

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
      quizId = response.data.quiz_id;

      questions = response.data.questions;
      displayQuestion(currentQuestionIndex);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
}

let remainingQ = document.getElementById("remaining-q");
let r = 1;
remainingQ.innerHTML = r + "/10";

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    const question = questions[currentQuestionIndex];
    let selectedOption = Number(selectedOptionId);
    if (selectedOption !== 0) {
      saveAnswer(question.id, selectedOption);
    }

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    r++;
    remainingQ.innerHTML = r + "/10";
  }
  selectedOptionId = null;
});

prevButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    r--;
    remainingQ.innerHTML = r + "/10";
  }
});

endButton.addEventListener("click", () => {
  const question = questions[currentQuestionIndex];
  let selectedOption = Number(selectedOptionId);
  if (selectedOption !== 0) {
    saveAnswer(question.id, selectedOption);
  }
  selectedOptionId = null;
  submitAnswers();
  showModal();
});

let answers = [];

function saveAnswer(questionId, answerId) {
  const existingAnswerIndex = answers.findIndex(
    (answer) => answer.questionId === questionId
  );
  if (existingAnswerIndex !== -1) {
    answers[existingAnswerIndex].answerId = answerId;
  } else {
    answers.push({ question_id: questionId, answer_id: answerId });
  }
}

function startCountdown() {
  const timerElement = document.getElementById("timer");

  const interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `time left: ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      alert("Your quiz time is over!");
      submitAnswers();
      showModal();
    }
    timeLeft--;
  }, 1000);
}

function submitAnswers() {
  const url = "http://127.0.0.1:8000/api/v1/quizzes/answer";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      quiz_id: quizId,
      answers: answers,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


  const modal = document.getElementById("myModal");
  const close = document.querySelector(".close");
modal.style.display = "none";
  function showModal () {
    modal.style.display = "flex";
  };

  close.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };