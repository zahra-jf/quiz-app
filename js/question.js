function getSkillIdFromURL() {
    const params = new URLSearchParams(window.location.search);
      console.log(params.get("skillId"));
    return params.get("skillId");
}

const skillId = getSkillIdFromURL();


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
  // const optionsContainer = document.getElementById("options-container");
  const question = questions[index];
  questionTextElement.textContent = question.title;
  // optionsContainer.innerHTML = "";
  // question.options.forEach((option) => {
  //   const optionElement = document.createElement("div");
  //   optionElement.classList.add("option");
  //   optionElement.textContent = option.text;
  //   optionsContainer.appendChild(optionElement);
  // });
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
           console.log(questions);
           
           displayQuestion(currentQuestionIndex); 
         })
         .catch((error) => {
           console.error("Error fetching questions:", error);
         });
}


document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
});








// let currentQuestionIndex = 0;
// let questions = [];

// function displayQuestion(index) {
//   const questionTextElement = document.getElementById("q-text");
//   const optionsContainer = document.getElementById("options-container");

//   const question = questions[index];
//   questionTextElement.textContent = question.title;

//   optionsContainer.innerHTML = ""; // پاک کردن گزینه‌های قبلی
//   question.options.forEach((option) => {
//     const optionElement = document.createElement("div");
//     optionElement.classList.add("option");
//     optionElement.textContent = option.text;
//     optionsContainer.appendChild(optionElement);
//   });
// }

// fetch(`http://127.0.0.1:8000/api/v1/skills/questions?skill_id=${skillId}`, {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//     "Content-Type": "application/json",
//   },
// })
//   .then((res) => res.json())
//   .then((response) => {
//     questions = response.data.questions;
//     displayQuestion(currentQuestionIndex); // نمایش سوال اول
//   })
//   .catch((error) => console.error("Error fetching questions:", error));

// // مدیریت کلیک بر روی دکمه‌های قبلی و بعدی
// document.getElementById("next-btn").addEventListener("click", () => {
//   if (currentQuestionIndex < questions.length - 1) {
//     currentQuestionIndex++;
//     displayQuestion(currentQuestionIndex);
//   }
// });

// document.getElementById("prev-btn").addEventListener("click", () => {
//   if (currentQuestionIndex > 0) {
//     currentQuestionIndex--;
//     displayQuestion(currentQuestionIndex);
//   }
// });
