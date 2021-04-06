const cardsContainer = document.getElementById('cards-container'),
  prevBtn = document.getElementById('prev'),
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
const cardsData = getCardsData();

// const cardsData = [{
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _"
//   },
//   {
//     question: "What is a variable?",
//     answer: "A container for a piece of data."
//   },
//   {
//     question: "Give example of Case Sensitive Variable.",
//     answer: "thisIsAVariable"
//   }
// ];


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

// Get cards from Local Storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add cards to Local Storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}


createCards();



// EVENT LISTENERS

// Move forward button
nextBtn.addEventListener('click', () => {
  // Hide the card to the left
  // .className overrides what is already there so add all classes
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  // Keep it within the range
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Move backward button
prevBtn.addEventListener('click', () => {
  // Hide the card to the right
  // .className overrides what is already there so add all classes
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  // Keep it within the range
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card button
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer);

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer
    };

    createCard(newCard);

    // Clear inputs
    questionEl.value = '';
    answerEl.value = '';

    // Hide add container
    addContainer.classList.remove('show');

    // Push newCard to the entire array
    cardsData.push(newCard);

    // Passing the entire array to Local Storage through setCardsData()
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  // Clear Local Storage
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});