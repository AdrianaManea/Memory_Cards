const cardsContainer = document.getElementById('cards-container'),
  prevBtn = document.getElementById('cards-prev'),
  nextBtn = document.getElementById('next'),
  currentEl = document.getElementById('current'),
  showBtn = document.getElementById('show'),
  hideBtn = document.getElementById('hide'),
  questionEl = document.getElementById('question'),
  answerEl = document.getElementById('answer'),
  addCardBtn = document.getElementById('add-card'),
  clearBtn = document.getElementById('clear'),
  addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

/*
2 Arrays:
 - one to store the actual elements
 - one to store the data for the cards
   - an array of objects with questions and answers
*/


// Array to Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [{
    question: "What must a variable begin with?",
    answer: "A letter, $ or _"
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data"
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable"
  }
];

// Loop through the data and create a DOM card for each one
// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
  `;

  // Show answer
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards 
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1 }/${cardsEl.length}`;
}

createCards();