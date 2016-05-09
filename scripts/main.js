document.onkeyup = function(event) {
	startGame(event);
}

var wins = 0;
var loses = 0;

function startGame(event) {
	document.onkeyup = null;
	document.getElementById("did-win").innerHTML = "";

	var guessesLeft = 10;
	var wordList = ["allen", "wes"];
	var toGuess = wordList[Math.floor(Math.random() * 2)];
	var checkCorrectWord = toGuess;
	var area = buildGuessArea(toGuess.length);
	printUpdate(area, guessesLeft);
	printCounters(wins, loses);
	document.onkeyup = function(event) {
		var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
		if (event.keyCode != 187) {
			var pos = toGuess.indexOf(userGuess)
			if (pos > -1) {
				toGuess = toGuess.replace(userGuess, "=");
				area.splice(pos, 1, userGuess);
				checkWin(checkCorrectWord, area);
			} else {
				guessesLeft--;
				checkLoss(guessesLeft);
			}
			printUpdate(area, guessesLeft);
		} else {
			guessesLeft--;
			printUpdate(area, guessesLeft);
			checkLoss(guessesLeft);
		}
	}
}

function buildGuessArea(size) {
	var arr = [];
	for (var i = 0; i < size; i++) {
		arr.push("_");
	}
	return arr;
}

function printUpdate(word, left) {
	document.getElementById("game").innerHTML = "<p>Word to guess: " + word.join(" ") + "</p>" +
		"<p>Guesses left: " + left + "</p>";
}

function printCounters(wins, loses) {
	document.getElementById("counters").innerHTML = "<p>" +
		"Wins: " + wins + "\n" +
		"Loses: " + loses + "</p>";
}

function checkWin(actualWord, userGuessing) {
	if (actualWord === userGuessing.join("")) {
		document.getElementById("did-win").innerHTML = "Congrats, you win! Press any key to start again!";
		wins++;
		printCounters(wins, loses);
		document.onkeyup = null;
		document.onkeyup = function() {
			startGame();
		}

	}
}

function checkLoss(guesses) {
	if (guesses === 0) {
		document.getElementById("did-win").innerHTML = "Sorry, you lost! Press any key to start again!";
		loses++;
		printCounters(wins, loses);
		document.onkeyup = null;
		document.onkeyup = function() {
			startGame();
		}
	}
}