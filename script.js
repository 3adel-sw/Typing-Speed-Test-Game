//Array Of Words

const words = [
  "Adel",
  "Ahmed",
  "Ali",
  "Amr",
  "Anas",
  "Aya",
  "Ayaan",
  "Ayham",
  "Aysa",
  "Aysha",
  "Ayshe",
  "Tahor",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
];

// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 3,
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName]; // Change Level From Here

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Rondom Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    // Create Text Node
    let wordText = document.createTextNode(words[i]);
    // Append Text To Div
    div.appendChild(wordText);
    // Append Div To Main Div
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    // Decrease Level Seconds
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stops Time
      clearInterval(start);
      // Compare Word
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call GenWords Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcomming Words Box
          upcomingWords.remove();
        }
      } else {
        // Game Over
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

function reloadPage() {
  location.reload();
}
