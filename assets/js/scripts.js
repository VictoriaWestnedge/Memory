var name = prompt("Hello! Welcome to the Memory Game. What is your name?")
const cards = document.querySelectorAll(".memory-card");

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
    let url = showImage(animalImageFirst);
    animalCard = this;
    animalCard.insertAdjacentHTML("beforeend", url)

  } else {
    secondCard = this;
    confirmPair();
    let animalImageSecond = secondCard.dataset.name
    let url = showImage(animalImageSecond);
    animalCard = this;
    animalCard.insertAdjacentHTML("beforeend", url)
  }
}

function confirmPair() {
  let isPair = firstCard.dataset.name === secondCard.dataset.name;
  isPair ? immobilizeCards() : unflipCards();
  isPair ? successScore += 1 : failureScore += 1
  if(successScore === 9) { setTimeout(() => {
    window.alert(`Congratulations ${name}, you have completed the game!`)
    }, 900)
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

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', (event) => {
  updateScore();
}));

function showImage (animalTagName) {
  let animalTag = '';
  const animalCard = document.querySelector(`[data-name=${animalTagName}]`)
  const searchAnimal = animalArray.find(animal => {
    if (animal.animalName == animalTagName) {
      animalTag = `<img class="up-face" src="${animal.animalUrl}"/>`
    }
  })
  return animalTag;
};

const request =  async () => {
  this.animalArray = []
  for (let index = 0; index < 9; index++) {
    const response = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20');
    const json = await response.json();
    let imageLink = (json.entries[index]["fields"]["image"].url);
    let imageName = (json.entries[index]["meta"].name);
    animalArray.push({"animalName": imageName, "animalUrl": imageLink})
  }
}

request()
