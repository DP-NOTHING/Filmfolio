const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
	movieId: String,
	movie: Buffer,
});
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	watchlist: {
		type: [MovieSchema],
		require: false,
		default: null,
	},
});
const TestSchema = new mongoose.Schema({
	image: {
		type: Buffer,
		default: null,
	},
});
const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);
const Test = mongoose.model('Test', TestSchema);
// console.log(User);
module.exports = { User, Movie, Test };
