const gameBox = document.getElementById("game");
var frstCard = null;
var secCard = null;
let cardsFlipped = 0;
let noClicking = false;

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
    while (counter > 0) {
         let index = Math.floor(Math.random() * counter);
         counter--;
         let temp = colors[counter];
         colors[counter] = colors[index];
         colors[index] = temp;
    }
    return array;
}

  // While there are elements in the array
  

  


let shuffledColors = shuffle(colors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArr) {
  for (let color of colorArr) {
       const newDiv = document.createElement("div");
       newDiv.classList.add(color)
       newDiv.addEventListener("click", handleCardClick);
       gameBox.append(newDiv);
  }
}
  


// TODO: Implement this function!
function handleCardClick(evt) {
  if (noClicking) return;
  if (evt.target.classList.contains("flipped")) return;

  let currentCard = evt.target; 
  currentCard.style.backgroundColor = currentCard.classList[0];
  
  if (!frstCard || !secCard) {
      currentCard.classList.add("flipped");
      frstCard = frstCard || currentCard;
      secCard = currentCard === frstCard ? null : currentCard;
  }

  if (frstCard && secCard) {
    noClicking = true;
    let gif1 = frstCard.className;
    let gif2 = secCard.className;
  
    if (gif1 === gif2) {
      cardsFlipped += 2;
      frstCard.removeEventListener("click", handleCardClick);
      secCard.removeEventListener("click", handleCardClick);
      frstCard = null;
      secCard = null;
      noClicking = false;
    } else {
      setTimeout(function() {
      frstCard.style.backgroundColor = "";
      secCard.style.backgroundColor = "";
      frstCard.classList.remove("flipped");
      secCard.classList.remove("flipped");
      frstCard = null;
      secCard = null;
      noClicking = false;
      }, 1000);
    }
  }
  if (cardsFlipped === colors.length) alert("game over");
}
createDivsForColors(shuffledColors);