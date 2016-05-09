var wins = 0;
var loses = 0;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h",
	"i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
	"w", "x", "y", "z"
]; //variables are made global to be used through out the entire script

document.onkeyup = function(event) { //waits for user to hit a key to run game initally
	startGame(event);
}

function startGame(event) {
	document.onkeyup = null; //gets rid of onkeyup event so the user can play the game
	document.getElementById("did-win").innerHTML = ""; //wipes the congrats or sorry statement if the user plays again
	var guessesLeft = 10;
	var wordList = ["allen", "wes", "gallifrey"];
	var toGuess = wordList[Math.floor(Math.random() * wordList.length)]; //random number to get a random word from array
	var checkCorrectWord = toGuess;
	var area = new Array(toGuess.length + 1).join("_").split(""); //builds new array of the same length of the word but with underscores
	var letterTracker = []; //initial array to track letters
	printUpdate(area, guessesLeft, letterTracker); //calls function to get initial gameboard
	printCounters(wins, loses); //separate function to print the win/loss counter

	document.onkeyup = function(event) { // new onkeyup function to play game

		var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); //generates letter from keycode of key pressed
		// var reg = new RegExp("[a-zA-Z]"); advanced way to find alpha characters
		// userGuess.match(reg) <-- returns a boolean value, true if something matches, false otherwise

		if (isAlpha(userGuess)) { //calls function to check if it's alpha character else just ignores input
			if (letterTracker.indexOf(userGuess) === -1) { //checks to see if letter has already been typed else just ignores input
				letterTracker.push(userGuess); //pushes new letter onto array to check against later
				var pos = toGuess.indexOf(userGuess) // checks against the word needed to guess to see if it's in there
				if (pos > -1) { //finds letter
					toGuess = checkMultipleOccurances(toGuess, userGuess, area)
					// ^ calls function to check if there are multiple occurances of letter and updates accordingly
					checkWin(checkCorrectWord, area); //calls function to check if win condition is met. 
				} else {
					guessesLeft--; //decrements numbers of guess less
					checkLoss(guessesLeft); //checks if number of guess is at zero and ends game
				}
				printUpdate(area, guessesLeft, letterTracker); //called here again to update board
			}
		}
	}
}

function checkMultipleOccurances(str, letter, arr) {
	for (var i = 0; i < str.length; i++) { //interate over string
		if (str.charAt(i) === letter) { //charAt grabs the letter of the string at the specific index, checks if it matches userInput
			str = str.replace(letter, "="); // string method to replace a letter in a string with '='
			arr.splice(i, 1, letter); //updates array to the newly added letter or letters can be displayed
		}
	}
	return str;
}

function isAlpha(input) {
	if (alphabet.indexOf(input) != -1) { //runs through alphabet defined on line 3 to check if user input was a letter
		return true;
	} else {
		return false;
	}
}

function printUpdate(word, left, track) {
	document.getElementById("game").innerHTML = "<p>Word to guess: " + word.join(" ") + "</p>" +
		"<p>Guesses left: " + left + "</p>" + "\n" +
		"Letters guessed: " + track.join(", ");
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