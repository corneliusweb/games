const inputEl = document.querySelector('.inputEl');
const submitEl = document.querySelector('.submitEl');
const leftGuessesEl = document.querySelector('.leftGuessesEl');
const gameOverBtnEl = document.querySelector('.gameOverBtnEl');
const prvGuessEl = document.querySelector('.prvGuessEl');
const differenceEl = document.querySelector('.differenceEl');
const guessOutcomeEl = document.querySelector('.guessOutcomeEl');

// generate dynamic ranges
const lowestRandom = Math.floor(Math.random() * 100) + 1;
const mediumRandom = Math.floor(Math.random() * 250) + 250;
const highestRandom = Math.floor(Math.random() * 500) + 500;

// set default level
let randomNumber = lowestRandom;

let timer;
const timerEl = document.querySelector('.timerEl');

let countdown;
let restartButton;
let attemptsCount = 1;
let maxAttempt;

// prevent form refresh on submit
document
	.querySelector('form')
	.addEventListener('submit', (e) => e.preventDefault());

const gameOverHeadingEl = document.querySelector('.gameOverHeadingEl');
const answerParaEl = document.querySelector('.answerParaEl');
const answerEl = document.querySelector('.answerEl');
const gameOverMsgEl = document.querySelector('.gameOverMsgEl');

// check current level
let currentLevel = 'easy';

function checkGuess() {
	const userGuess = Number(inputEl.value);

	if (userGuess === randomNumber) {
		differenceEl.textContent = '';
		gameOverHeadingEl.textContent = 'CHAMPION ALERT!🎉';
		answerEl.textContent = randomNumber;
		answerParaEl.textContent = `The answer is  ${answerEl.textContent}`;

		if (attemptsCount < 5) {
			gameOverMsgEl.textContent = `You're not just a winner; you're a mastermind!🧠 Your keen instincts and sharp mind just cracked the code. Keep shining and guess on — the world is at your fingertips!`;
		} else {
			gameOverMsgEl.textContent = `Well done, Mastermind! You cracked the code like a true genius. Victory is sweet when it's earned through sheer brilliance. Ready for the next challenge?`;
		}

		setGameOver();
	} else if (
		(attemptsCount === 10 && currentLevel === 'easy') ||
		(attemptsCount === 13 && currentLevel === 'balanced') ||
		(attemptsCount === 15 && currentLevel === 'mindReader')
	) {
		differenceEl.textContent = '';
		gameOverHeadingEl.textContent = 'GAME OVER!💔';
		gameOverMsgEl.textContent = `Don't worry, genius! Every great mind has a few missteps before reaching victory. 🚀 Dust yourself off and give it another go. Success is just one guess away! You've got this!`;
		answerEl.textContent = randomNumber;
		answerParaEl.textContent = `The correct answer is  ${answerEl.textContent}`;

		setGameOver();
	} else {
		// check distance between user guess and the random
		const difference = Math.abs(randomNumber - userGuess);

		if (currentLevel === 'balanced' || currentLevel === 'mindReader') {
			if (difference <= 5) {
				differenceEl.textContent = `That was a close call! You got this champ!`;
			} else if (difference <= 10) {
				differenceEl.textContent = `You're not far from home. You got this!`;
			} else if (difference > 10 && difference < 50) {
				differenceEl.textContent = `Get it together, you are not that far.`;
			} else {
				differenceEl.textContent = `You're far away! Go again.`;
			}
		} else if (userGuess > randomNumber) {
			differenceEl.textContent = 'Last guess was too high.';
		} else if (userGuess < randomNumber) {
			differenceEl.textContent = 'Last guess was too low.';
		}

		// prevent the recording of invalid inputs
		if (userGuess > 1000 || userGuess < 1) {
			differenceEl.textContent = 'Invalid! Please enter numbers 1 - 1000';
			guessOutcomeEl.style.display = 'none';

			// pause guesses left
			if (maxAttempt !== 10) {
				++maxAttempt;
			} else {
				maxAttempt += 1;
			}
			--attemptsCount;
		} else {
			prvGuessEl.textContent += ` ${userGuess}`;
			guessOutcomeEl.style.display = 'block';
			guessOutcomeEl.textContent = 'Wrong!';
		}
	}

	inputEl.focus();
	inputEl.value = '';
	attemptsCount++;
	const leftGuesses = --maxAttempt;
	leftGuessesEl.textContent = leftGuesses;
}

submitEl.addEventListener('click', checkGuess);

function checkCurrentLevel() {
	if (currentLevel === 'balanced') {
		timer = 95;
		maxAttempt = 13;
		timerEl.textContent = '95';
		leftGuessesEl.textContent = '13';

		setBalanced();
	} else if (currentLevel === 'mindReader') {
		timer = 100;
		maxAttempt = 15;
		timerEl.textContent = '100';
		leftGuessesEl.textContent = '15';

		setMindReader();
	} else if (currentLevel === 'easy') {
		timer = 90;
		maxAttempt = 10;
		timerEl.textContent = '90';
		leftGuessesEl.textContent = '10';

		setEasy();
	}
}

const gameOverModal = document.querySelector('.gameOverEl');
const gameLevelModal = document.querySelector('.gameLevelsEl');
const changeLevelBtn = document.querySelectorAll('.changeLevelEl');

// display game levels
function showLevels() {
	for (const button of changeLevelBtn) {
		button.addEventListener('click', () => {
			gameLevelModal.style.display = 'flex';
			gameOverModal.style.display = 'none';

			attemptsCount = 1;
			inputEl.value = '';
			guessOutcomeEl.style.display = 'none';
			inputEl.focus();

			if (restartButton) {
				restartButton.parentNode.removeChild(restartButton);
			}

			setDisabledEl();
			checkCurrentLevel();
			clearGameStates();
			resetTimer();
		});
	}
}
showLevels();

// set game levels
function setEasy() {
	randomNumber = Math.floor(Math.random() * 100) + 1;

	if (currentLevel !== 'easy') {
		currentLevel = 'easy';
		enabledStartBtn();
		checkCurrentLevel();
	}
}
document.querySelector('.levels .easy').addEventListener('click', () => {
	gameLevelModal.style.display = 'none';
	setEasy();
});

function setBalanced() {
	randomNumber =
		Math.floor(Math.random() * (mediumRandom - lowestRandom + 1)) +
		lowestRandom;

	// set level
	if (currentLevel !== 'balanced') {
		currentLevel = 'balanced';
		enabledStartBtn();
		checkCurrentLevel();
	}
}
document.querySelector('.levels .balanced').addEventListener('click', () => {
	gameLevelModal.style.display = 'none';
	setBalanced();
});

function setMindReader() {
	randomNumber =
		Math.floor(Math.random() * (highestRandom - lowestRandom + 1)) +
		lowestRandom;

	// set level
	if (currentLevel !== 'mindReader') {
		currentLevel = 'mindReader';
		enabledStartBtn();
		checkCurrentLevel();
	}
}
document.querySelector('.levels .mind-reader').addEventListener('click', () => {
	gameLevelModal.style.display = 'none';
	setMindReader();
});

const helpBtn = document.querySelector('.helpBtnEl');
const helpModal = document.querySelector('.helpEl');

// disable form and display description
document.addEventListener('DOMContentLoaded', (event) => {
	helpModal.style.display = 'flex';
	setDisabledEl();
	checkCurrentLevel();
});

document.querySelector('.helpEl .close').addEventListener('click', () => {
	helpModal.style.display = 'none';
});
helpBtn.addEventListener('click', () => {
	helpModal.style.display = 'flex';
});

// set game over
function setGameOver() {
	restartButton = document.createElement('button');
	restartButton.textContent = 'Restart Game';
	restartButton.setAttribute('class', 'restartButtonEl');
	restartButton.textContent = 'Restart Game';
	gameOverBtnEl.appendChild(restartButton);

	gameOverModal.style.display = 'flex';

	enabledStartBtn();
	setDisabledEl();
	resetTimer();

	restartButton.addEventListener('click', restartGame);
}

function restartGame() {
	inputEl.value = '';
	guessOutcomeEl.style.display = 'none';
	inputEl.focus();

	attemptsCount = 1;
	gameOverBtnEl.removeChild(restartButton);
	gameOverModal.style.display = 'none';

	setDisabledEl();
	clearGameStates();
	checkCurrentLevel();
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
	startTimer();
	inputEl.focus();
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

function startTimer() {
	countdown = setInterval(() => {
		timer--;
		timerEl.textContent = timer;

		if (timer <= 0) {
			clearInterval(countdown);
			gameOverHeadingEl.textContent = '⌛TIMEOUT!⌛';
			gameOverMsgEl.textContent = `You really need the time to think, but you've to move quicker champ! Go again!`;
			answerEl.textContent = randomNumber;
			answerParaEl.textContent = `The correct answer is  ${answerEl.textContent}`;

			setGameOver();
			checkCurrentLevel();
		}
	}, 1000);
}

// stops timer before countdown is over
function resetTimer() {
	clearInterval(countdown);
}

function clearGameStates() {
	const paras = document.querySelectorAll('.gameStatesEl p');
	for (const para of paras) {
		para.textContent = '';
	}
	prvGuessEl.textContent = '';
}
