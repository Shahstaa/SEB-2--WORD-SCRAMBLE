/*-------------- Constants -------------*/
const levels = {
    easy: {
        words: ['cat', 'car' ,'cool' ,'colour'],
        attempts: 4
    },
    medium: {
        words: ['ramp','stamp','damp','lamp'],
        attempts: 3
    },
    hard: {
        words: ['development','improvement','advancement','achievement'],
        attempts: 2
    }
};
/*---------- Variables (state) ---------*/
let currentLevel = 'easy';
let attempts = levels[currentLevel].attempts;
let selectedWord = '';
let scrambledWord = '';

/*----- Cached Element References  -----*/
const scrambledElement = document.getElementById('scrambled');
const attemptsLeftElement = document.getElementById('attempts-left');
const messageElement = document.getElementById('message');
const guessInput = document.getElementById('guess');
const restartButton = document.getElementById('restart');
/*-------------- Functions -------------*/

// Function to scramble the word
function scrambleWord(word) {
    const wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join('');
}

// Function to display the scrambled letters as buttons
function displayScrambledButtons(scrambled) {
    scrambledElement.innerHTML = ''; // Clear previous buttons
    scrambled.split('').forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.className = 'letter-button';
        button.onclick = () => handleLetterClick(letter);
        scrambledElement.appendChild(button);
    });
}
function handleLetterClick(letter) {
    guessInput.value += letter; 
}

function pickRandomWord(){
    return levels[currentLevel].words[Math.floor(Math.random() * levels[currentLevel].words.length)];
}
function updateSelectedWord(){
    let newWord;

    while(true){
        newWord = pickRandomWord();
        if(newWord !== selectedWord){
            break
        }
    }
    selectedWord = newWord
}

function updateSelectedScrambleWord(){
    let newScrambleWord;
    while(true){
        newScrambleWord = scrambleWord(selectedWord);
        if(newScrambleWord !== selectedWord){
            break
        }
    }
    scrambledWord = newScrambleWord
} 

function startGame() {
    attempts = levels[currentLevel].attempts;
    updateSelectedWord()
    updateSelectedScrambleWord()
    // scrambledWord = scrambleWord(selectedWord);
    displayScrambledButtons(scrambledWord);
    attemptsLeftElement.innerText = attempts;
    messageElement.innerText = '';
    restartButton.classList.add('hidden');
    guessInput.value = '';
}
function submitGuess() {
    const guess = guessInput.value.toLowerCase();
    if (guess === selectedWord) {
        messageElement.innerText = 'Correct! You have completed the ' + currentLevel + ' level.';
        restartButton.classList.remove('hidden');
        // TEST
        startGame()
    } else {
        attempts--;
        attemptsLeftElement.innerText = attempts;
        messageElement.innerText = 'Incorrect!';
        
        if (attempts === 0) {
            messageElement.innerText = `Game Over! The correct word was "${selectedWord}".`;
            restartButton.classList.remove('hidden');
        }
    }
    guessInput.value = '';
}

function changeLevel(level) {
    currentLevel = level;
    startGame();
}
/*----------- Event Listeners ----------*/
document.getElementById('easy').addEventListener('click', () => changeLevel('easy'));
document.getElementById('medium').addEventListener('click', () => changeLevel('medium'));
document.getElementById('hard').addEventListener('click', () => changeLevel('hard'));
document.getElementById('submit').addEventListener('click', submitGuess);
restartButton.addEventListener('click', startGame);

// Start the game on initial load
startGame();
