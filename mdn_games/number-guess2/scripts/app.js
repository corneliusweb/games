// define dynamic range
const randomStart = Math.floor(Math.random() * 100) + 1;
const randomEnd = Math.floor(Math.random() * 500) + 500;
let randomNumber = Math.floor(
	Math.random() * (randomEnd - randomStart + 1) + randomStart
);

// select global html elements
const leftGuessesEl = document.querySelector('.leftGuessesEl');
let timer;

const numberEl = document.querySelector('.numberEl');
const submitEl = document.querySelector('.submitEl');

const prvGuessEl = document.querySelector('.prvGuessEl');
const guessOutcomeEl = document.querySelector('.guessOutcomeEl');
const differenceEl = document.querySelector('.differenceEl');

let attemptCount = 1;
let maxAttempt = 10;
leftGuessesEl.textContent = maxAttempt;

function checkGuess() {
	const userGuess = Number(numberEl.value);

	if (attemptCount === 1) {
		prvGuessEl.textContent = 'Previous guesses:';
	}
	prvGuessEl.textContent += ` ${userGuess}`;

	if (userGuess === randomNumber) {
		differenceEl.textContent = '';
		numberEl.disabled = true;
		submitEl.disabled = true;

		if (attemptCount < 5) {
			guessOutcomeEl.textContent = `That was a crazy move! You're a genius!!!`;
		} else {
			guessOutcomeEl.textContent = `That's correct! Congrats!!`;
		}
	} else if (attemptCount === 10) {
		differenceEl.textContent = '';
		numberEl.disabled = true;
		submitEl.disabled = true;
		guessOutcomeEl.textContent = '!!!GAME OVER!!!';
	} else {
		const difference = Math.abs(randomNumber - userGuess);
		if (difference < 10) {
			differenceEl.textContent = `That was a close call! You got this champ!`;
		} else if (difference < 50) {
			differenceEl.textContent = `You're not far from home. Trust me, you got this!`;
		} else if (difference >= 50) {
			differenceEl.textContent = `You're far away! Go again.`;
		}
	}

	attemptCount++;
	const leftGuesses = --maxAttempt;
	leftGuessesEl.textContent = leftGuesses;
}

submitEl.addEventListener('click', checkGuess);


