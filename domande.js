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

///::BEGIN DICHIARAZIONE VARIABILI

//variabile che andremo ad incrementare d 1 ogni volta che l'utente risponde correttamente
let punteggioUtente = 0;
//variabile per tenere traccia delle domande (sarà il nostro indice PAGINA!!! da non confondere con indice del ciclo dove cicleremo l'array delle domande)
let questionNumber = 0;
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

///::END DICHIARAZIONE VARIABILI

//SPOSTATE TUTTE LE RISPOSTE (CORREETTE + SBAGLIAOTE) IN UN UNICO ARRAY CHE CI SERVIRA' PER CREARE I TASTI DELLE RISPOSTE
for (let i = 0; i < questions.length; i++) {
  questions[i].incorrect_answers.push(questions[i].correct_answer);
  arrayRisposteUser.push(questions[i].incorrect_answers);
}

//("METTIAMO LE CUFFIE E [...]" CIT.ANGELO) CI ASCOLTIAMO OGNI TASTO CON IL LISTENER PER POTER INVIARE ALLA FIUNZIONE DI VERIFICA RISPOSTA, LA RISPOSTA SELEZIONATA
const aggiungiListener = function () {
  for (let i = 0; i < buttonRisposta.children.length; i++) {
    buttonRisposta.children[i].addEventListener("click", function () {
      salvaRisposta(buttonRisposta.children[i].innerText);
    });
  }
};

//FUNZIONE CHE ESEGUE I COMANDI A FINE CICLO / FINE DOMANDE
let finish = function () {
  document.querySelector("footer").innerHTML = "";
  document.querySelector("#timer").innerHTML = "";
  clearInterval(timerInterval);

  //ESPOSIZIONE PUNTEGGIO FINALE CON CONTA LUNGHEZZA ARRAY DOMANDE DINAMICOHHHHH

  if (punteggioUtente >= 6) {
    trovaDomanda.innerHTML = "Il tuo punteggio finale è " + punteggioUtente + "/" + questions.length + "<br><br>";
    trovaDomanda.innerHTML += "Hai superato la prova, complimenti!";
  } else {
    trovaDomanda.innerHTML = "Il tuo punteggio finale è " + punteggioUtente + "/" + questions.length + "<br><br>";
    trovaDomanda.innerHTML += "Non hai superato la prova... consulta il tuo insegnante.";
  }
};

//RENDERIZZO I BOTTONI E LE DOMANDE A SECONDA DELL'INDICE
const creaBottoni = function () {
  //RESETTO CONTATORI AL CLICK SUL PULSANTE
  seconds = 0;
  timeCountdown = 60;
  buttonRisposta.innerHTML = "";

  //CICLO L'ARRAY DI RISPOSTE CREATO SOPRA
  for (let i = 0; i < arrayRisposteUser[questionNumber].length; i++) {
    buttonRisposta.innerHTML += `<button>${arrayRisposteUser[questionNumber][i]}</button>`;
    trovaDomanda.innerText = questions[questionNumber].question;
    indice.innerText = ` ${questionNumber + 1}`;
  }

  //AGGIUNGO EVENTI LISTENER AI PULSANTI CREATI
  aggiungiListener();

  console.log(questionNumber);

  //CASISTICA FINE DOMANDE: SE ULTIMA DOMANDA CANCELLO TUTTA LA GRAFICA DELLE PRECEDENTI DOMANDE X PREPARARE LA PAGINA ALLA VALUTAZIONE
  if (questionNumber === 9) {
    for (let i = 0; i < buttonRisposta.children.length; i++) {
      buttonRisposta.children[i].addEventListener("click", function () {
        buttonRisposta.innerHTML = "";
        timer.style.background = `conic-gradient(transparent 0%, transparent 0% `; //SOLUZIONE POCO ELEGANTE MA LA PIU EFFICACE: OSCURO TUTTA LA GRAFICA DEL TIMER
        clearInterval(timerInterval); // STOPPO LA FUNZIONE SETINTERVAL
        finish(); // RICHIAMO LA PAGINA CON I RISULTATI
      });
    }
  }
};
//INIZIALIZZO TASTI CREATI SOPRA
creaBottoni();

//CHECK RISPOSTA SELEZIONATA CON QUELLA CORRETTA: APPENA DO LA RISPOSTA LA CONFRONTO, SE CORRETTA AGGIUNGO 1 AL PUNTEGGO E VADO AVANTI SE SBAGLAITA VADO AVANTI (E ANCHE A STUDIARE :D)
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

//FUNZIONE TIMER CHE SI DIVIDE IN 2 PARTI: PARTE JS QUI SOTTO E PARTE CSS EVIDENZIATA NEL FILE
function countdown() {
  //MI CREO LA PERCENTUALE CHE SARA' IL MIO STEP DA 0 A 60 SECONDI
  const percentuale = (seconds / total) * 100;

  //CREO IL CONO CON CONIC-GRADIENT DANDO COME PERCENTUALE DINAMICA OGNI STEP CHE INCREMENTO I SECONDI; IL "percentuale+2" SERVE A DARE L'EFFETTO SFUMATO ALLA LINGUETTA
  timer.style.background = `conic-gradient(transparent ${percentuale}%, #00ffff ${percentuale + 2}% `;

  //MI FORMATTO IL TESTO ALL'INTERNO DEL TIMER
  elapsed.innerHTML = `<div class="master">
      <div>Seconds</div>
      <div class="counter">${timeCountdown}</div>
      <div>Remaining</div>
    </div>`;

  //USATO timeCountDown e seconds PER POTER GESTIRE LA GRAFICA IN SENSO ORARIO E IL DECREMENTO DEI SECONDI DA 60 A 0
  timeCountdown--;
  seconds++;

  //CONTROLLO SE TIMER SCADUTO E(!!!) NON ULTIMA RISPOSTA, ALLORA VADO AVANTI CHIAMADO LA NUOVA DOMANDA
  if (seconds > 60 && questionNumber < 9) {
    elapsed.innerHTML = `<div class="master">Tempo Scaduto!</div>`;
    seconds = 0;
    timeCountdown = 60;
    questionNumber++;
    creaBottoni();
    //SE TIMER SCADUTO E(!!!) ULTIMA DOMANDA, CHIAMO FINISH SVUOTANDO TUTTO IL CONTENUTO CHE NON CI SERVE
  } else if (seconds > 60 && questionNumber === 9) {
    buttonRisposta.innerHTML = "";
    finish();
  }
}
//INIZIALIZZO TIMER
const timerInterval = setInterval(countdown, 1000);
