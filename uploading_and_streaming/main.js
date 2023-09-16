const dotenv = require('dotenv');
dotenv.config('./../.env');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { connect } = require('./../db/connection');
const router = express.Router();
router.use(express.json());
app.use(cors());
let gridfsBucket;
const gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('media');
const storage = new GridFsStorage({
	url: `${process.env.CONNECTIONSTRING}`,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			return resolve({
				bucketName: 'media',
			});
		});
	},
});
const upload = multer({ storage });
router.route('/get-video').get(async (req, res) => {
	const file = await gfs.files.findOne({
		filename: 'fe61b47179fa4fb576bd02a42fe1a421',
	});
	// Set appropriate headers for video streaming
	res.setHeader('Content-Type', 'video/mp4');
	res.setHeader('Accept-Ranges', 'bytes'); // Indicate that the server supports range requests
	const fileSize = file.length;

	// Parse the range header
	const rangeHeader = req.headers.range;
	if (rangeHeader) {
		const parts = rangeHeader.replace(/bytes=/, '').split('-');
		const start = parseInt(parts[0], 10);
		let end = Math.min(file.chunkSize + start, fileSize - 1);

		// Calculate the chunk size
		const chunkSize = end - start + 1;

		// Set response headers for partial content
		res.status(206); // Partial Content
		res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
		res.setHeader('Content-Length', chunkSize);
		// Create a readable stream for the specified range
		end++;
		const readStream = gridfsBucket.openDownloadStream(file._id, {
			start,
			end,
		});
		readStream.pipe(res);
	} else {
		// No range header, serve the entire video
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.on('end', () => console.log('ended'));
		readStream.pipe(res);
	}
});
router.route('/upload-video').post(upload.single('video'), async (req, res) => {
	return res.end('uploaded successfully');
});
(async () => {
	console.log(process.env.CONNECTIONSTRING);
	const conn = await mongoose.connect(process.env.CONNECTIONSTRING);
	gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
		bucketName: 'media',
	});
	console.log(upload);
	// console.log('------------------', conn);
	// console.log('connected');
})();
module.exports.router = router;
