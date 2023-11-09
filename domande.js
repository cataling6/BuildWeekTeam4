const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//variabile che andremo ad incrementare d 1 ogni volta che l'utente risponde correttamente
let punteggioUtente = 0;
//variabile per tenere traccia delle domande (sarà il nostro indice PAGINA!!! da non confondere con indice del ciclo dove cicleremo l'array delle domande)
let questionNumber = 9;
let seconds = 0;
let timeCountdown = 60;
const total = 60;
let buttonRisposta = document.querySelector(".bottoniRisposta");
let trovaDomanda = document.querySelector(".domanda p");
let indice = document.querySelector("#index");
//elementi timer - elapsed sono i secondi + il testo; timer è la grafica
const elapsed = document.querySelector("#elapsed");
const timer = document.querySelector("#timer");
let rispostaSelezionata = "";
let arrayRisposteUser = [];

for (let i = 0; i < questions.length; i++) {
  questions[i].incorrect_answers.push(questions[i].correct_answer);
  arrayRisposteUser.push(questions[i].incorrect_answers);
}

const aggiungiListener = function () {
  for (let i = 0; i < buttonRisposta.children.length; i++) {
    buttonRisposta.children[i].addEventListener("click", function () {
      salvaRisposta(buttonRisposta.children[i].innerText);
    });
  }
};

let finish = function () {
  document.querySelector("footer").innerHTML = "";
  document.querySelector("#timer").innerHTML = "";
  clearInterval(timerInterval);
  trovaDomanda.innerText = "Il tuo punteggio finale è " + punteggioUtente + "/" + questions.length; //
};

//renderizzo i bottoni e le domande a seoncda dell'indice
const creaBottoni = function () {
  //resetto contatori al click sul pulsante
  seconds = 0;
  timeCountdown = 60;
  buttonRisposta.innerHTML = "";
  for (let j = 0; j < arrayRisposteUser[questionNumber].length; j++) {
    buttonRisposta.innerHTML += `<button>${arrayRisposteUser[questionNumber][j]}</button>`;
    trovaDomanda.innerText = questions[questionNumber].question;
    indice.innerText = ` ${questionNumber + 1}`;
  }
  aggiungiListener();

  console.log(questionNumber);
  if (questionNumber === 9) {
    for (let i = 0; i < buttonRisposta.children.length; i++) {
      buttonRisposta.children[i].addEventListener("click", function () {
        buttonRisposta.innerHTML = "";
        elapsed.innerHTML = "";
        timer.style.background = `conic-gradient(transparent 0%, transparent 0% `;
        clearInterval(timerInterval);
        finish();
      });
    }
  }
};

creaBottoni();

//check risposta apparentemente funzionante
const salvaRisposta = function (risposta) {
  for (i = 0; i < questions.length; i++) {
    if (risposta === questions[questionNumber].correct_answer) {
      console.log("corretto");
      console.log(risposta);
      console.log(questions[questionNumber].correct_answer);
      punteggioUtente += 1;
      questionNumber++;
      creaBottoni();

      break;
    } else {
      console.log("sbagliato");
      questionNumber++;
      creaBottoni();

      break;
    }
  }
};

function countdown() {
  const percentuale = (seconds / total) * 100;
  timer.style.background = `conic-gradient(transparent ${percentuale}%, red ${percentuale + 2}% `;
  elapsed.innerHTML = `<div class="master">
      <div>Seconds</div>
      <div>${timeCountdown}</div>
      <div>Remaining</div>
    </div>`;
  timeCountdown--;
  seconds++;
  if (seconds > 60 && questionNumber < 9) {
    elapsed.innerHTML = `<div class="master">Tempo Scaduto!</div>`;
    seconds = 0;
    timeCountdown = 60;
    questionNumber++;
    creaBottoni();
  } else if (seconds > 60 && questionNumber === 9) {
    buttonRisposta.innerHTML = "";
    finish();
  }
}
const timerInterval = setInterval(countdown, 100);
