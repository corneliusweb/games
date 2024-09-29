// generate dynamic range
const randomStart = Math.floor(Math.random() * 100) + 1;
const randomEnd = Math.floor(Math.random() * 500) + 500;
let randomNumber = Math.floor(
	Math.random() * (randomEnd - randomStart + 1) + randomStart
);
// for testing
// let randomNumber = 400;

// select global html elements
const leftGuessesEl = document.querySelector('.leftGuessesEl');
let timer;
let restartButton;

const inputEl = document.querySelector('.inputEl');
const submitEl = document.querySelector('.submitEl');

const gameOverBtnEl = document.querySelector('.gameOverBtnEl');
const prvGuessEl = document.querySelector('.prvGuessEl');
const gameStatesEl = document.querySelector('.gameStatesEl');
const differenceEl = document.querySelector('.differenceEl');
const guessOutcomeEl = document.querySelector('.guessOutcomeEl');

let attemptsCount = 1;
let maxAttempt = 10; // try out a feature to set maxAttempt dynamically
leftGuessesEl.textContent = maxAttempt;

document
	.querySelector('form')
	.addEventListener('submit', (e) => e.preventDefault());

function checkGuess() {
   const userGuess = Number(inputEl.value);
   
   prvGuessEl.textContent += ` ${userGuess}`;
   guessOutcomeEl.style.display = 'block'

	if (userGuess === randomNumber) {
		setGameOver();
		differenceEl.textContent = '';

		if (attemptsCount < 5) {
			guessOutcomeEl.textContent = `That was a crazy move! You're a genius!!!`;
		} else {
			guessOutcomeEl.textContent = `That's correct! Congrats!!`;
		}
	} else if (attemptsCount === 10) {
		setGameOver();
		differenceEl.textContent = '';
		guessOutcomeEl.textContent = '!!!GAME OVER!!!';
	} else {
		const difference = Math.abs(randomNumber - userGuess);
		if (difference < 10) {
			differenceEl.textContent = `That was a close call! You got this champ!`;
		} else if (difference <= 50) {
			differenceEl.textContent = `You're not far from home. You got this!`;
		} else if (difference > 50) {
			differenceEl.textContent = `You're far away! Go again.`;
		}
		guessOutcomeEl.textContent = 'Wrong!';

		if (inputEl.value > 1000 || inputEl.value < 1) {
			prvGuessEl.textContent = '';
			difference.textContent = '';
			guessOutcomeEl.textContent = 'Invalid! Pick numbers between 1 - 1000';

			if (maxAttempt !== 10) {
				++maxAttempt;
			} else {
				maxAttempt += 1;
			}
			--attemptsCount;
		}
	}

	inputEl.focus();
	inputEl.value = '';
	attemptsCount++;
	const leftGuesses = --maxAttempt;
	leftGuessesEl.textContent = leftGuesses;
}

submitEl.addEventListener('click', checkGuess);

function setGameOver() {
	restartButton = document.createElement('button');
	restartButton.textContent = 'Restart Game';
	restartButton.setAttribute('class', 'restartButtonEl');
	restartButton.textContent = 'Restart Game';
	gameOverBtnEl.appendChild(restartButton);

	setDisabledEl();

	restartButton.addEventListener('click', restartGame);
}

function restartGame() {
	const paras = document.querySelectorAll('.gameStatesEl p');
	for (const para of paras) {
		para.textContent = '';
	}
	prvGuessEl.textContent = '';

	attemptsCount = 1;
	maxAttempt = 10;
	inputEl.value = '';
	inputEl.focus();
	leftGuessesEl.textContent = 10;

	gameOverBtnEl.removeChild(restartButton);

	randomNumber =
		Math.floor(Math.random() * (randomEnd - randomStart + 1)) + randomStart;

	unsetDisabledEl();
}

function setDisabledEl() {
	inputEl.disabled = true;
	inputEl.style.cursor = 'not-allowed';
	inputEl.style.opacity = '0.6';

	submitEl.disabled = true;
	submitEl.style.cursor = 'not-allowed';
	submitEl.style.opacity = '0.6';
}

function unsetDisabledEl() {
	inputEl.disabled = false;
	inputEl.style.cursor = 'text';
	inputEl.style.opacity = '1';

	submitEl.disabled = false;
	submitEl.style.cursor = 'pointer';
	submitEl.style.opacity = '1';
}
