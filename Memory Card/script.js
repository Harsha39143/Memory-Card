const cards = document.querySelectorAll(".card");
const moveCountElem = document.getElementById("moveCount");
const timerElem = document.getElementById("timer");
const newGameBtn = document.getElementById("newGameBtn");
const congratsMessage = document.getElementById("congratsMessage");

let matched = 0, moves = 0, seconds = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerElem.textContent = seconds;
  timerInterval = setInterval(() => {
    seconds++;
    timerElem.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateMoves() {
  moves++;
  moveCountElem.textContent = moves;
}

function showCongrats() {
  congratsMessage.style.display = "block";
}

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      cardOne = clickedCard;
      return;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    updateMoves();

    const cardOneImg = cardOne.querySelector(".back-view img").src;
    const cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      stopTimer();
      showCongrats();
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matched = 0;
  moves = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  moveCountElem.textContent = "0";
  congratsMessage.style.display = "none";

  const arr = [1, 2, 3, 4, 5, 6, 7, 8,
               1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() - 0.5);

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    const img = card.querySelector(".back-view img");
    img.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });

  startTimer();
}

newGameBtn.addEventListener("click", shuffleCard);
shuffleCard();
cards.forEach(card => card.addEventListener("click", flipCard));
