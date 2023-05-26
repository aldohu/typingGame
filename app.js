'use strict';

const difficulty = document.querySelector('.difficulty-settings');
const level = document.getElementById('difficulty');
const word = document.querySelector('#word');
const typingPlace = document.querySelector('.typing-place');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const endGameMessage = document.querySelector('#end-game-container');
const showSettings = document.querySelector('.btn');
const game = document.querySelector('.active');

let timeLeft = 0;
let timeSet;
let timeoutId;
let randomWord;

function showDifficultySettings() {
	difficulty.classList.toggle('hide');
	difficulty.classList.toggle('show');
}

function updateTimer() {
	if (level.value === 'easy') {
		timeSet = 10;
	} else if (level.value === 'medium') {
		timeSet = 7;
	} else {
		timeSet = 3;
	}
	timeLeft += timeSet;
	time.textContent = timeLeft;
}

const words = [
	'sigh',
	'tense',
	// ...
];

function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
	randomWord = getRandomWord();
	typingPlace.value = '';
	typingPlace.focus();

	updateTimer();
	word.textContent = randomWord;

	clearTimeout(timeoutId);
	countdown();
}

function countdown() {
	if (timeLeft > 0) {
		timeLeft--;
		time.textContent = timeLeft;
		timeoutId = setTimeout(countdown, 1000);
	} else {
		endGame();
	}
}

function endGame() {
	endGameMessage.classList.remove('hidden');
	endGameMessage.classList.add('visible');
	endGameMessage.innerHTML = `<h1>Time ran out</h1>
    <p>Your score is ${score.textContent}</p>
    <button class="btn" onclick="location.reload()">Play again</button>`;
	game.classList.add('hidden');
}

typingPlace.addEventListener('input', (e) => {
	if (e.target.value === randomWord) {
		score.textContent = Number(score.textContent) + 1;
		//timeLeft += timeSet;
		startGame();
	}
});

showSettings.addEventListener('click', showDifficultySettings);
difficulty.addEventListener('change', updateTimer);
document.addEventListener('DOMContentLoaded', startGame);
