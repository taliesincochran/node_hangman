var inquirer = require('inquirer');
var fs = require('fs');
var Word = require('./word.js');
var game = 
{
	"words" : ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", 
	"Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil", "Brunei", 
	"Bulgaria", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Chad", "Chile", "China", "Colombia", "Congo","Croatia", "Cuba", "Cyprus", "Denmark", "Djibouti", 
	"Ecuador", "Egypt","Estonia", "Ethiopia", "Fiji", "Finland","France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", 
	"Guinea","Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
	"Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
	"Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", 
	"Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands","Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", 
	"Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa","Senegal", "Serbia", "Seychelles","Singapore", "Slovakia", 
	"Slovenia","Spain", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga","Tunisia", 
	"Turkey", "Turkmenistan", "Uganda", "Ukraine","Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
    "wins": 0,
    "currentWord": {},
    "validLetters" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "startGame": function() {
		var newWord = game.words[Math.floor(Math.random()*game.words.length)];
    	game.currentWord = new Word(newWord);
    	game.currentWord.getLetters(game.currentWord.newWord);
    	console.log("Welcome to Geography hangman. Guess the country!\n");
    	game.currentWord.getDisplayWord();
    	game.promptPlayer();

    },
    'checkLetter' : function(letterChoosen) {
     	var letter = letterChoosen.toLowerCase();
        var numberFound = 0;
        if(game.validLetters.includes(letter) && !game.currentWord.lettersGuessed.includes(letter)) {
	        for(var i = 0; i < game.currentWord.letters.length; i++) {
	            if(game.currentWord.letters[i].character === letter.toLowerCase() || game.currentWord.letters[i].character === letter.toUpperCase()) {
	                game.currentWord.letters[i].visible = true;
	                game.currentWord.numberRight++;
	                numberFound++;
	            }
	        }
	        if(numberFound === 0) {
	            game.currentWord.guessesLeft--;
	            if(!game.currentWord.lettersGuessed.includes(letter)) {
	            	game.currentWord.lettersGuessed.push(letter);
	            }
	            console.log("Letters already guessed:", game.currentWord.lettersGuessed.join(' '));
	            console.log("Incorrect. You have", game.currentWord.guessesLeft, "guesses left.\n");
	        }
	        else if(numberFound === 1) {
	            console.log("You guessed right! There was one", letter, "\n");
	            if(!game.currentWord.lettersGuessed.includes(letter)) {
	            	game.currentWord.lettersGuessed.push(letter);
	            }
	            console.log("Letters already guessed:", game.currentWord.lettersGuessed.join(' '));
	        }
	        else {
	            console.log("You guessed right! There were", numberFound, letter,"'s\n");
	        }
	        game.currentWord.getDisplayWord();
	        game.numberRight += numberFound;
	        game.checkWin();
	    } 
	    else if (game.currentWord.lettersGuessed.includes(letter)) {
	    	console.log("You already guessed that letter. Try again.\n");
	    	game.promptPlayer();

	    } 
	    else {
	    	console.log("Please inter a valid guess.\n");
	    	game.promptPlayer();
	    }
    },
    'checkWin': function() {
    	if(game.currentWord.numberRight === game.currentWord.letters.length) {
			console.log("You win!\n");
			game.wins++  
			if(game.wins === 1) {
				console.log("You've won 1 time.");
			} else {
			console.log("You've won " + game.wins + " times.\n");   
			}
			game.restart();
		} 
        else if (game.currentWord.guessesLeft === 0) {
			console.log("You lose! The word was", game.currentWord.newWord, "\n");
			game.restart();
		} 
        else {
			game.promptPlayer();
		}

    },
    "promptPlayer": function() {
    	inquirer.prompt(
    		[ 
    		{
    			message: 'Please guess a letter and hit enter.',
    			name: 'guessedLetter'
    		}
    		]).then(function(result) {
    		    if(game.validLetters.indexOf(result.guessedLetter !== -1)) {
	    				console.log("You guessed: " + result.guessedLetter);
	    		var numberGuessed = game.checkLetter(result.guessedLetter);
    			}
    		})
    },
    'restart': function() {
    	inquirer.prompt(
    		[
    			{
    				message: "Would you like to play again?",
    				type: 'confirm',
    				name: 'confirm'
    			}
    		]).then(function(result){
    			if(result.confirm) {
    				game.startGame();
    			}
    		})
    }
}
game.startGame();


