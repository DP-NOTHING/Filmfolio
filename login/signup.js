const express = require('express');
const app = express();
const { User } = require('../db/schemas');
const { default: mongoose } = require('mongoose');
const router = express.Router();
router.use(express.json());
router.route('/').post(async (req, res) => {
	// console.log(User);
	// const data = JSON.parse(req.body);
	// console.log(req.body);
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const data = await User.find();
	try {
		await User.insertMany([{ username, password, email }]);
		res.sendStatus(200).end('signup');
	} catch (error) {
		res.sendStatus(405).end(`error: ${error}`);
	}
	// console.log(req.body);
});
module.exports.router = router;
