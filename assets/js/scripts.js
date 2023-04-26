const cards = document.querySelectorAll(".memory-card");
// const choices = document.querySelectorAll('.choice');

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
  } else {
    secondCard = this;

    confirmPair();
  }
}

function confirmPair() {
  let isPair = firstCard.dataset.name === secondCard.dataset.name;
  isPair ? immobilizeCards() : unflipCards();
  isPair ? successScore += 1 : failureScore += 1
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

const request = async () => {
  const response = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20');
  const json = await response.json();
  console.log(json.entries[0]["fields"]["image"].url);
}

request();

/* var obj = {
  "entries": [
  {
    "meta": {
      "name": "bear"
    },
      "fields": {
        "image": {
          "url": "https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg"
        }
      }
    }
  ]
}
console.log(obj.entries[0]["meta"].name);
console.log(obj.entries[0]["fields"].image.url);

const call = (input) => {
  return new Promise((resolve, reject) => {
    return resolve({
      val: input,
    });
  });
};

call(obj.entries[0]["fields"].image.url)
  .then((res) => console.log(res.val)); */