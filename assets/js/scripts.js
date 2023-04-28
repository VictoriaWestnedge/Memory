const cards = document.querySelectorAll(".memory-card");

var name = prompt("Hello! Welcome to the Memory Game. What is your name?")

let flippedCard = false;
let lockTable = false;
let firstCard, secondCard;
let successScore = 0;
let failureScore = 0;

function flipCard() {
  if (lockTable) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if(!flippedCard) {
    flippedCard = true;
    firstCard = this;
    let animalImageFirst = firstCard.dataset.name
    showImage(animalImageFirst);

  } else {
    secondCard = this;
    confirmPair();
    let animalImageSecond = secondCard.dataset.name
    showImage(animalImageSecond);

  }
}

function confirmPair() {
  let isPair = firstCard.dataset.name === secondCard.dataset.name;
  isPair ? immobilizeCards() : unflipCards();
  isPair ? successScore += 1 : failureScore += 1
  if(successScore === 9) { setTimeout(() => {
    window.alert(`Congratulations ${name}, you have completed the game!`)
    }, 900)
    // resetTable()
  };
}

function immobilizeCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetCards();
}

function unflipCards() {
  lockTable = true;

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetCards();
    }, 1500);
  }

function resetCards() {
  [flippedCard, lockTable] = [false, false];
  [firstCard, secondCard] = [null, null]
}

(function shuffleOrder() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 18);
    card.style.order = randomPosition;
  });
})();

function updateScore() {
  const successScoreConst = document.getElementById("successScore");
  const failureScoreConst = document.getElementById("failureScore");

  successScoreConst.textContent = `Successes: ${successScore}`;
  failureScoreConst.textContent = `Failures: ${failureScore}`;
}

/* function resetTable(){
  firstCard = null;
  secondCard = null;
  lockTable = false;
  unflipCards()
  flippedCard = false;
  successScore = 0;
  failureScore = 0;
  cards.forEach(card => card.removeEventListener('click', flipCard));
  cards.forEach(card => card.removeEventListener('click', (event) => {
    updateScore();
  }));
} */

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', (event) => {
  updateScore();
}));

const animalCard = document.querySelector(".memory-card")

function showImage (animalTagName) {
  const searchAnimal = animalArray.find(animal => {
    if (animal.animalName == animalTagName) {
      let animalTag = `<img class="up-face" src="${animal.animalUrl}"/>`
      animalCard.insertAdjacentHTML("beforeend", animalTag)
    }
  })
};

const request =  async () => {
  this.animalArray = []
  for (let index = 0; index < 9; index++) {
    const response = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20');
    const json = await response.json();
    let imageLink = (json.entries[index]["fields"]["image"].url);
    let imageName = (json.entries[index]["meta"].name);
    animalArray.push({"animalName": imageName, "animalUrl": imageLink})
    // animalTagArray["tag"] = `<img class="up-face" src="${imageLink}"/>`
    // animalTag = `<img class="up-face" src="${imageLink}"/>`
    // animalTagArray.push(animalTag)
    // animalTagArray.forEach(imageCard => animalCard.insertAdjacentHTML("beforeend", imageCard))
  }
  // console.log(animalArray)
}

request()
