import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
import Tmdb from '../Tmdb/index';
// import ReactPlayer from 'react-player';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import 'video.js/dist/video-js.css';
import './Player.css';
import { useRef } from 'react';
export default function Player() {
	// getting id from my current locations
	const id = useLocation().pathname.split('/')[2];
	const [list, setList] = useState(null);
	const [data, setData] = useState(null);
	const [trailer, setTrailer] = useState(null);
	// getting whole item object sent from RowItem component while navigating
	const [poster, setPoster] = useState('');
	const item = useLocation().state;
	// console.log(item);
	const ref = useRef(null);
	const getList = async () => {
		if (item.item.first_air_date) {
			let query = '';
			const main = [];
			const data = await Tmdb.getMovieInfo(item.item.id, 'tv');
			let start = 1;
			// console.log(data.info, '())()))())()()');
			for (let i = 1; i <= data.info.number_of_seasons; i++) {
				query += `season/${i},`;
				if (i % 20 === 0 || i == data.info.number_of_seasons) {
					const res = await Tmdb.getEpisodes(item.item.id, query);
					let myeps = [];
					for (let j = start; j <= i; j++) {
						if (res) {
							myeps.push(res[`season/${j}`].episodes);
						} else break;
					}
					main.push(myeps);
					start = i + 1;
					query = '';
				}
			}
			setTrailer(data?.trailer);
			setList(main);
		} else {
			const data = await Tmdb.getMovieInfo(item.item.id, 'movie');
			setTrailer(data?.trailer);
			setData(data.info);
		}
	};
	useEffect(() => {
		getList();
	}, []);
	useEffect(() => {
		const videoPlayer = videojs(ref.current.id, {
			controls: true,
			autoplay: false,
			fluid: true,
		});
		videoPlayer.src('https://vjs.zencdn.net/v/oceans.mp4');

		// Cleanup when the component unmounts
		// return () => {
		// 	// console.log(videoPlayer);
		// 	if (videoPlayer) {
		// 		videoPlayer.dispose(); // Dispose of the Video.js player
		// 	}
		// };
	}, []);

	// Clean up when the component unmounts
	//   return () => {
	// 	player.dispose();
	//   };
	// }, []);

	const showBigPlayButton = (player) => {
		const bigPlayButton = player.controlBar.getChild('BigPlayButton');
		if (bigPlayButton) {
			bigPlayButton.show();
		}
	};

	const hideBigPlayButton = (player) => {
		const bigPlayButton = player.controlBar.getChild('BigPlayButton');
		if (bigPlayButton) {
			bigPlayButton.hide();
		}
	};

	return (
		<>
			{/* <ReactPlayer
				controls
				url={`https://www.youtube-nocookie.com/embed/${
					trailer?.split('?')[1].split('=')[1]
				}?rel=0&loop=1&autoplay=1`}
				muted
				playing={true}
				config={{
					youtube: {
						playerVars: {
							modestbranding: 1,
							controls: 0,
							showinfo: 0,
							rel: 0,
						},
					},
				}}
			/> */}
			{/* <div class='background'>
				<div class='videoWrapper'>
					<header class='cover'></header>
					<iframe
						width='1920'
						height='1080'
						src={`https://www.youtube-nocookie.com/embed/${
							trailer?.split('?')[1].split('=')[1]
						}?rel=0&loop=1&autoplay=1`}
						frameborder='0'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
						allowfullscreen
					></iframe>

					<footer class='cover'></footer>
				</div>
			</div> */}
			{/* <div>Player</div> */}
			{/* <div data-vjs-player> */}
			{/* <div
				className='video-container'
				data-vjs
			>
				<video
					className='video-js'
					poster={`https://image.tmdb.org/t/p/w500${item.item.backdrop_path}`}
					controls
					src={trailer}
					// src={`http://127.0.0.1:3000/stream/get-video/${id}`}
				></video>
			</div> */}
			<video
				ref={ref}
				id='my_video_1'
				class='video-js vjs-default-skin'
				width='640px'
				height='267px'
				controls
				preload='none'
				poster='http://content.bitsontherun.com/thumbs/3XnJSIm4-480.jpg'
				data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
			>
				<source
					src='//content.bitsontherun.com/videos/bkaovAYt-52qL9xLP.mp4'
					type='video/mp4'
				/>
				<source
					src='//content.bitsontherun.com/videos/bkaovAYt-27m5HpIu.webm'
					type='video/webm'
				/>
				<track
					label='pt'
					kind='captions'
					srclang='pt'
					src='http://playertest.longtailvideo.com/caption-files/sintel-en.srt'
					default=''
				/>
			</video>
			{list &&
				list.map((part, i) => {
					return (
						<Accordion
							data-bs-theme='dark'
							key={i}
						>
							{part.map((season) => {
								return (
									<Accordion.Item
										eventKey={`${season[0].season_number}`}
									>
										<Accordion.Header>
											Season {season[0].season_number}
										</Accordion.Header>

										<Accordion.Body
											key={season[0].season_number}
										>
											<ListGroup>
												{season.map((episode, i) => {
													// console.log(episode);
													return (
														<ListGroup.Item
															variant='dark'
															action
															key={`${season[0].season_number}-${episode.episode_number}`}
														>
															<h4>
																Episode
																{` ${
																	i + 1
																}`}:{' '}
																{episode.name}
															</h4>
															<span>
																episode:
																{` ${episode.episode_number}`}
															</span>
															{episode.runtime ? (
																<div>
																	runtime:
																	{` ${episode.runtime} minutes`}
																</div>
															) : (
																''
															)}
															{episode.overview ? (
																<div>
																	overview:
																	{` ${episode.overview}`}
																</div>
															) : (
																''
															)}
															{episode.vote_average ? (
																<div>
																	rating:
																	{` ${episode.vote_average} ⭐`}
																</div>
															) : (
																''
															)}
															{episode.air_date ? (
																<div>
																	aired on:{' '}
																	{` ${episode.air_date}`}
																</div>
															) : (
																''
															)}
														</ListGroup.Item>
													);
												})}
											</ListGroup>
										</Accordion.Body>
									</Accordion.Item>
								);
							})}
						</Accordion>
					);
				})}
			{data && (
				<>
					<h3>Title: {data.original_title}</h3>
					<span>Tag: {data.tagline}</span>
					<p>Overview: {data.overview}</p>
					<span>duration: {data.runtime} minutes</span>
				</>
			)}
			{/* </div> */}
		</>
		// <videojs></videojs>
	);
}
// import React, { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// // import videojs from 'video.js'; // Import Video.js library
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import './Player.css';

// const Player = () => {
// 	const item = useLocation().state;
// 	const ref = useRef(null);
// useEffect(() => {
// 	// console.log(ref);
// 	// Initialize Video.js when the component mounts
// 	const videoPlayer = videojs(ref.current.id, {
// 		controls: true,
// 		autoplay: false,
// 		fluid: true,
// 	});
// 	{
// 		/* <div class="vjs-play-progress vjs-slider-bar" aria-hidden="true" style="color: red;width: 22.94%;"><div class="vjs-time-tooltip" aria-hidden="true" style="right: -18px;">0:01</div></div> */
// 	}
// 	// Load the video source
// 	videoPlayer.src('http://techslides.com/demos/sample-videos/small.webm');

// 	// Cleanup when the component unmounts
// 	// return () => {
// 	// 	console.log(videoPlayer);
// 	// 	if (videoPlayer) {
// 	// 		videoPlayer.dispose(); // Dispose of the Video.js player
// 	// 	}
// 	// };
// }, []);

// 	return (
// 		// <div className='video-container'>
// 		// <video
// 		// 	ref={ref}
// 		// 	id='video-player' // Use 'id' to target the video element
// 		// 	className='video-js'
// 		// 	poster={`https://image.tmdb.org/t/p/w500${item.item.backdrop_path}`}
// 		// 	controls
// 		// ></video>

// 		// </div>
// 	);
// };

// export default Player;
