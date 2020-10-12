const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");


const words = [
  'programming',
  'Hanan',
  'function',
  'Markon',
  'object', 
  'parameter',
  'Danny',
  'argument',
  'higher order function',
  'callback',
  'event listener',
  'data type',
  'array',
  'boolean'
]
// Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//set difficulty on local storage or medium
let difficulty = localStorage.getItem("diffcilty") !== null ?
localStorage.getItem('difficulty') : 'medium';

//set diffculity select value
difficultySelect.value =  localStorage.getItem("diffcilty") !== null ?
localStorage.getItem('difficulty') : 'medium';

//focuse on text when start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generat random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
  function addWordToDOM() {
      randomWord = getRandomWord();
      word.innerHTML = randomWord;
  }
   addWordToDOM();
//update score
   function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }
  //update time
  function updateTime() {
     time--;
     timeEl.innerHTML = time + 's';

     if (time === 0) {
       clearInterval(timeInterval);
       //end game
       gameOver();
     }
  }

  //end game, over show
  function gameOver() {
    endgameEl.innerHTML = `
    <h1> Time ran out </h1>
    <p> your final score${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
  }
  
//event listners
text.addEventListener('input', e=>{
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
      //clear
        addWordToDOM();
         
        e.target.value = '';
        updateScore();
        if (difficulty === 'hard') {
          time += 10;
        } if (difficulty === 'medium') {
          time += 7;
        } else if ( difficulty === 'easy') {
          time += 3;
        }

        updateTime();
    }

});

// seetings btn click
settingsBtn.addEventListener('click', () =>
settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
   localStorage.setItem('difficulty', difficulty);
});



