let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastGuess = document.querySelector('.last-guess');
const lowOrHi = document.querySelector('.low-or-hi');

const guessSubmit = document.querySelector('.guess-submit');
const guessInput = document.querySelector('.guess-input');

let guessRound = 1;
let resetButton = document.querySelector('.reset-btn');
resetButton.style.display = 'none';

function checkGuess() {
	const userGuess = Number(guessInput.value);
	if (guessRound === 1) {
		guesses.textContent = 'Previous guesses:';
	}
	guesses.textContent = `${guesses.textContent} ${userGuess}`;

	if (userGuess === randomNumber) {
		lastGuess.textContent = 'Congratulations! You got it right!';
		lastGuess.style.backgroundColor = 'green';
		lowOrHi.textContent = '';
		setGameOver();
	} else if (guessRound === 10) {
		lastGuess.textContent = '!!!GAME OVER!!!';
		lowOrHi.textContent = '';
		setGameOver();
	} else {
		lastGuess.textContent = 'Wrong!';
		lastGuess.style.backgroundColor = 'red';
		lastGuess.style.padding = '8px 50px';
		lastGuess.style.color = '#fff';
		lastGuess.style.display = 'inline';
		if (userGuess < randomNumber) {
			lowOrHi.textContent = 'Last guess was too low!';
		} else if (userGuess > randomNumber) {
			lowOrHi.textContent = 'Last guess was too high!';
		}
	}

	guessRound++;
	guessInput.value = '';
	guessInput.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
	guessInput.disabled = true;
	guessSubmit.disabled = true;
	resetButton.style.display = 'block';
	resetButton.textContent = 'Restart Game';
	resetButton.addEventListener('click', resetGame);
}

function resetGame() {
	guessRound = 1;

	const gameStates = document.querySelectorAll('.game-infos p');
	for (const state of gameStates) {
      state.textContent = '';
      
   }
   


	resetButton.parentNode.removeChild(resetButton);

	guessInput.disabled = false;
	guessSubmit.disabled = false;
	guessInput.value = '';
	guessInput.focus();

	lastGuess.style.backgroundColor = 'white';

	randomNumber = Math.floor(Math.random() * 100) + 1;
}
