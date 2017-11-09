//this module is the object for the letter and contains the logic for making it visible or not
var letter = function(abc) {
	this.character = abc
	this.visible = false;
	this.makeVisible = function () {
		this.visible = true;
	}
}
module.exports = letter;