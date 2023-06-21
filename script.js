
class Quizz {
  constructor(questions, answers, helps) {
    this.question = questions;
    this.answer = answers;
    this.help = helps
  }
}

let Score = 0
let Step = 0

// Idée amélioration - JSON
const Easy = new Quizz(
  [
    "Question 1",
    "Question 2",
    "Question 3"
  ],
  [
    [
      ["Q1 Easy - Réponse 1", true],
      ["Q1 Easy - Réponse 2", false],
      ["Q1 Easy - Réponse 3", false]
    ],
    [
      ["Q2 Easy - Réponse 1", false],
      ["Q2 Easy - Réponse 2", true],
      ["Q2 Easy - Réponse 3", false]
    ],
    [
      ["Q3 Easy - Réponse 1", false],
      ["Q3 Easy - Réponse 2", true],
      ["Q3 Easy - Réponse 3", false]
    ]
  ],
  [
    "Q1 - help",
    "Q2 - help"
  ]
);

const Hard = new Quizz(
  [
    "Question 1",
    "Question 2",
    "Question 3"
  ],
  [
    [
      ["Q1 Expert - Réponse 1", true],
      ["Q1 Expert - Réponse 2", false],
      ["Q1 Expert - Réponse 3", false]
    ],
    [
      ["Q2 Expert - Réponse 1", true],
      ["Q2 Expert - Réponse 2", false],
      ["Q2 Expert - Réponse 3", false]
    ],
    [
      ["Q3 Expert - Réponse 1", false],
      ["Q3 Expert - Réponse 2", false],
      ["Q3 Expert - Réponse 3", false]
    ]
  ],
  [
    "Q1 - help",
    "Q2 - help"
  ]
);

// Test de la fonction :
// checkAnswer(Easy.answer[0][0][1])
// console.log(Score)

const divQuizz = document.getElementById("quizz")

function startQuizz() {
  const startParagraphe = document.createElement("p")
  const startDivAnswers = document.createElement("div")
  startDivAnswers.setAttribute("id", "start_div")
  const startButton = document.createElement("button")
  const startButton2 = document.createElement("button")

  divQuizz.appendChild(startParagraphe)
  divQuizz.appendChild(startDivAnswers)
  startDivAnswers.appendChild(startButton)
  startDivAnswers.appendChild(startButton2)

  startButton.innerHTML = "Je souhaite tester mes connaissances"
  startButton2.innerHTML = "Non, merci"


  startButton.onclick = function() {
    document.getElementById("start_div").style.display = "none"
    displayLevel()
  }

  startButton2.onclick = function() {
    document.getElementById("quizz_box").style.display = "none"
  }

}

function displayLevel() {
  const divLevelAnswers = document.createElement("div")
  const divLevelButton = document.createElement("button")
  const divLevelButton2 = document.createElement("button")

  divQuizz.appendChild(divLevelAnswers)
  divLevelAnswers.appendChild(divLevelButton)
  divLevelAnswers.appendChild(divLevelButton2)
  divLevelAnswers.setAttribute("id", "levels");

  divLevelButton.innerHTML = "Novice"
  divLevelButton2.innerHTML = "Expert"

  divLevelButton.onclick = function() {
    document.getElementById("levels").style.display = "none"
    displayQuizz(Easy)
  }

  divLevelButton2.onclick = function() {
    document.getElementById("levels").style.display = "none"
    displayQuizz(Hard)
  }
}

function displayQuizz(Quizz) {
  const questionParagraphe = document.createElement("p")
  const divAnswers = document.createElement("div")
  const answerButton = document.createElement("button")
  const answerButton2 = document.createElement("button")
  const answerButton3 = document.createElement("button")

  questionParagraphe.innerHTML = Quizz.question[Step]
  questionParagraphe.setAttribute("id", "quizz_title")
  answerButton.innerHTML = Quizz.answer[Step][0][0]
  answerButton2.innerHTML = Quizz.answer[Step][1][0]
  answerButton3.innerHTML = Quizz.answer[Step][2][0]

  divQuizz.appendChild(questionParagraphe)
  divQuizz.appendChild(divAnswers)
  divAnswers.setAttribute("id", "answers");
  divAnswers.appendChild(answerButton)
  divAnswers.appendChild(answerButton2)
  divAnswers.appendChild(answerButton3)

  answerButton.onclick = function() {
    if (Step < Quizz.question.length - 1) {
      checkAnswer(Easy.answer[Step][0][1])
      displayNextQuestions(Quizz, questionParagraphe, answerButton, answerButton2, answerButton3)
    } else {
      checkAnswer(Easy.answer[Step][0][1])
      checkScore()
    }
  }
  answerButton2.onclick = function() {
    if (Step < Quizz.question.length - 1) {
      checkAnswer(Easy.answer[Step][1][1])
      displayNextQuestions(Quizz, questionParagraphe, answerButton, answerButton2, answerButton3)
    } else {
      checkAnswer(Easy.answer[Step][1][1])
      checkScore()
    }
  }
  answerButton3.onclick = function() {
    if (Step < Quizz.question.length - 1) {
      checkAnswer(Easy.answer[Step][2][1])
      displayNextQuestions(Quizz, questionParagraphe, answerButton, answerButton2, answerButton3)
    } else {
      checkAnswer(Easy.answer[Step][2][1])
      checkScore()
    }
  }

}

function displayNextQuestions(Quizz, question, answer1, answer2, answer3) {
  question.innerHTML = Quizz.question[Step]
  answer1.innerHTML = Quizz.answer[Step][0][0]
  answer2.innerHTML = Quizz.answer[Step][1][0]
  answer3.innerHTML = Quizz.answer[Step][2][0]
}

function checkAnswer(answer) {
  if (answer == true) {
    Score += 1
  }
  Step += 1
}

function checkScore() {
  const scoreLink = document.createElement("a")
  const space = document.createElement("br")
  const restartLink = document.createElement("a")
  restartLink.innerHTML = "Recommencer"
  restartLink.href = "/"

  if (Score < Easy.question.length * (1 / 3)) {
    displayScore()
    scoreLink.innerHTML = "Slide to target 1"
    scoreLink.href = "/#target1"
  } else if (Score < Easy.question.length * (1 / 2)) {
    displayScore()
    scoreLink.innerHTML = "Slide to target 2"
    scoreLink.href = "/#target2"
  } else {
    displayScore()
    scoreLink.innerHTML = "Slide to target 3"
    scoreLink.href = "/#target3"
  }
  divQuizz.appendChild(scoreLink)
  divQuizz.appendChild(space)
  divQuizz.appendChild(restartLink)
  scoreLink.onclick = function() {
    document.getElementById("quizz_box").style.display = "none"
  }
}

function displayScore() {
  const scoreParagraphe = document.createElement("p");
  scoreParagraphe.innerHTML = `Score : ${Score}/${Easy.question.length}`
  divQuizz.innerHTML = ""
  divQuizz.appendChild(scoreParagraphe)
}

startQuizz()