const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const homeBtn = document.getElementById('home-btn');

const coverPage = document.getElementById('cover-page');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score-text');

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Python", correct: true }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', showNextQuestion);
tryAgainBtn.addEventListener('click', startQuiz);
homeBtn.addEventListener('click', () => {
  resultContainer.classList.add('hidden');
  coverPage.classList.remove('hidden');
});

function startQuiz() {
  coverPage.classList.add('hidden');
  resultContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.classList.add('answer-btn');
    if (answer.correct) {
      btn.dataset.correct = true;
    }
    btn.addEventListener('click', selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add('hidden');
  answerButtons.innerHTML = '';
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === 'true';

  if (correct) {
    score++;
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.style.backgroundColor = 'green';
    } else {
      button.style.backgroundColor = 'red';
    }
    button.disabled = true;
  });

  nextBtn.classList.remove('hidden');
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}