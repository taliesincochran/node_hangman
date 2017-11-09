var letter = require('./letter.js');
function Word(newWord) {
    this.newWord = newWord;
    this.letters = [];
    this.guessesLeft = 6;
    this.lettersGuessed = [],
    this.numberRight = 0;
    this.getLetters = function() {
        var newWordLetters = this.newWord.split('');
        for (var i = 0; i < newWordLetters.length; i++) {
            this.letters.push(new letter(newWordLetters[i]));
        }
    };
    this.getDisplayWord = function() {
        var displayWord = '';
        for(var i = 0; i<this.letters.length; i++) {
            if(this.letters[i].visible === true) {
                displayWord += this.letters[i].character + " ";
                // displayWord += " ";
            }else {
                displayWord += "_ ";
                // displayWord += " ";
            }
        }
        console.log('Word: ',displayWord);
    };

}
module.exports = Word;
