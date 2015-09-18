console.log("matches model loaded");

var mongoose = require("mongoose")

var matchSchema = new mongoose.Schema({
	issue:String,
	finder:String,
	found:String
});

var Match = mongoose.model("matches",matchSchema);

module.exports = Match;
