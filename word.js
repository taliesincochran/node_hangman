//this module returns an object for the word with objects from letter.js for each letters.
var letter = require('./letter.js');
function Word(newWord) {
    this.newWord = newWord;
    this.letters = [];
    this.guessesLeft = 6;
    this.lettersGuessed = [],
    this.numberRight = 0;
}
Word.prototype.getLetters = function() {
    var newWordLetters = this.newWord.split('');
    for (var i = 0; i < newWordLetters.length; i++) {
        this.letters.push(new letter(newWordLetters[i]));
    }
};
Word.prototype.getDisplayWord = function() {
    var displayWord = '';
    for(var i = 0; i<this.letters.length; i++) {
        displayWord += this.letters[i].display();
    }
    console.log('Country: ',displayWord, "\n");
};
module.exports = Word;
