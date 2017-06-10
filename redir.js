var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const URI = "mongodb://localhost:27018/data";

mongoose.connect(process.env.dbURI || URI);

var redirectSchema = new Schema({
	num: Number,
	originalUrl: String,
	shortUrl: String
})

var Redir = mongoose.model('Redir', redirectSchema);

module.exports = Redir;