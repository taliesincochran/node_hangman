//this module is the object for the lette, behold it's glory and usefulness.
var letter = function(abc) {
	this.character = abc
	this.visible = false;
	this.display = function() {
		if(this.visible) {
			return this.character + " ";
		} else {
			return "_ ";
		}
	}
}
module.exports = letter;