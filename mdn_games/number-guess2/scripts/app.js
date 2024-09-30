// generate dynamic range
const lowestRandom = Math.floor(Math.random() * 100) + 1;
const mediumRandom = Math.floor(Math.random() * 250) + 250;
const highestRandom = Math.floor(Math.random() * 500) + 500;

let randomNumber = lowestRandom;
// for testing
// let randomNumber = 400;

// select global html elements
let timer;
let restartButton;

const inputEl = document.querySelector('.inputEl');
const submitEl = document.querySelector('.submitEl');

const leftGuessesEl = document.querySelector('.leftGuessesEl');
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
	guessOutcomeEl.style.display = 'block';

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

const gameOverModal = document.querySelector('.gameOverEl');
const gameLevelModal = document.querySelector('.gameLevelsEl');
const changeLevelBtn = document.querySelectorAll('.changeLevelEl');

function showLevel() {
	for (const button of changeLevelBtn) {
		button.addEventListener('click', () => {
			gameLevelModal.style.display = 'flex';
			gameOverModal.style.display = 'none';

			const paras = document.querySelectorAll('.gameStatesEl p');
			for (const para of paras) {
				para.textContent = '';
			}
			prvGuessEl.textContent = '';

			attemptsCount = 1;
			maxAttempt = 10;
			inputEl.value = '';
			guessOutcomeEl.style.display = 'none';
			inputEl.focus();
			leftGuessesEl.textContent = 10;
			setDisabledEl();
		});
	}
}
showLevel();

// set game levels
function setEasy() {
	randomNumber = lowestRandom;
}
document.querySelector('.levels .easy').addEventListener('click', () => {
	setEasy();
	gameLevelModal.style.display = 'none';
});

function setBalanced() {
	randomNumber =
		Math.floor(Math.random() * (mediumRandom - lowestRandom + 1)) +
		lowestRandom;
}
document.querySelector('.levels .balanced').addEventListener('click', () => {
	setBalanced();
	gameLevelModal.style.display = 'none';
});

function setMindReader() {
	randomNumber =
		Math.floor(Math.random() * (highestRandom - lowestRandom + 1)) +
		lowestRandom;
}
document.querySelector('.levels .mind-reader').addEventListener('click', () => {
	setMindReader();
	gameLevelModal.style.display = 'none';
});

const helpBtn = document.querySelector('.helpBtnEl');
const helpModal = document.querySelector('.helpEl');

document.addEventListener('DOMContentLoaded', (event) => {
	helpModal.style.display = 'flex';
	setDisabledEl();
});

document.querySelector('.helpEl .close').addEventListener('click', () => {
	helpModal.style.display = 'none';
});
helpBtn.addEventListener('click', () => {
	helpModal.style.display = 'flex';
});

function setGameOver() {
	restartButton = document.createElement('button');
	restartButton.textContent = 'Restart Game';
	restartButton.setAttribute('class', 'restartButtonEl');
	restartButton.textContent = 'Restart Game';
	gameOverBtnEl.appendChild(restartButton);

	gameOverModal.style.display = 'flex';

	enabledStartBtn();
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
	guessOutcomeEl.style.display = 'none';
	inputEl.focus();
	leftGuessesEl.textContent = 10;

	gameOverBtnEl.removeChild(restartButton);
	gameOverModal.style.display = 'none';

	showLevel();
	unsetDisabledEl();
}

function setDisabledEl() {
	inputEl.disabled = true;
	inputEl.style.cursor = 'not-allowed';
	inputEl.style.opacity = '0.4';

	submitEl.disabled = true;
	submitEl.style.cursor = 'not-allowed';
	submitEl.style.opacity = '0.4';
}

function unsetDisabledEl() {
	inputEl.disabled = false;
	inputEl.style.cursor = 'text';
	inputEl.style.opacity = '1';

	submitEl.disabled = false;
	submitEl.style.cursor = 'pointer';
	submitEl.style.opacity = '1';
}

const startBtn = document.querySelector('.startGameEl');

function startGame() {
	unsetDisabledEl();
	disableStartBtn();
}
startBtn.addEventListener('click', () => {
	startGame();
});

function disableStartBtn() {
	startBtn.disabled = true;
	startBtn.style.cursor = 'not-allowed';
	startBtn.style.opacity = '0.3';
}

function enabledStartBtn() {
	startBtn.disabled = false;
	startBtn.style.cursor = 'pointer';
	startBtn.style.opacity = '1';
}
