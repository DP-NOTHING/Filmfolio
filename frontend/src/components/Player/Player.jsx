import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import videojs from 'video.js';
import Tmdb from '../Tmdb/index';
// import ReactPlayer from 'react-player';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { useRef } from 'react';
import 'video.js/dist/video-js.min.css';
import './Player.css';
import logo from '../../assets/logo2.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Player() {
	// getting id from my current locations
	const [isLoading, setIsLoading] = useState(false);
	const id = useLocation().pathname.split('/')[2];
	const [list, setList] = useState(null);
	const [data, setData] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
	const Navigate = useNavigate();
	const [poster, setPoster] = useState('');
	const item = useLocation().state;
	const player = useRef(null);
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
			// console.log(data);
			setTrailer(data?.trailer);
			setList(main);
		} else {
			const data = await Tmdb.getMovieInfo(item.item.id, 'movie');
			setTrailer(data?.trailer);
			setData(data.info);
		}
	};
	useEffect(() => {
		setIsLoading(true);
		getList().then(() => {
			const videoPlayer = videojs(player.current, {
				controls: true,
				autoplay: false,
				fluid: true,
			});
			videoPlayer.src('https://vjs.zencdn.net/v/oceans.mp4');
			if (!isPlayerInitialized) {
				// Initialize the Video.js player
				const videoPlayer = videojs(player.current, {
					controls: true,
					autoplay: false,
					fluid: true,
				});
				videoPlayer.src('https://vjs.zencdn.net/v/oceans.mp4');
				setIsPlayerInitialized(true);
			}
			setIsLoading(false);
		});
	}, []);
	return (
		<div>
			<header className='black'>
				<div className='header--logo'>
					<a href='/home'>
						<img
							src={logo}
							alt='logo'
						/>
					</a>
				</div>
				<Button
					onClick={() => {
						Navigate('/home');
					}}
					variant='outline-dark'
					style={{ marginRight: 'auto' }}
				>
					<img
						src='https://cdn3.iconfinder.com/data/icons/netflix-6/64/02_Home_house_front_page_website-256.png'
						height={'30px'}
						width={'28px'}
						alt=''
					/>
				</Button>
				<div className='header--user'>
					<a href='/user'>
						<img
							src='https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png'
							alt=''
						/>
					</a>
				</div>
			</header>
			{isLoading && (
				<div className='loading'>
					<img
						src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif'
						alt='Loading...'
					/>
				</div>
			)}
			<div style={{ display: isLoading ? 'none' : 'block' }}>
				<div
					data-vjs-player='true'
					// data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
					// poster='http://content.bitsontherun.com/thumbs/3XnJSIm4-480.jpg'
					style={{
						marginTop: '1vh',
					}}
				>
					<video
						ref={player}
						className='video-js vjs-default-skin'
						// id='my_video_1'
						// className='video-js vjs-default-skin'
						width='640px'
						height='267px'
						controls
						preload='none'
						poster={`https://image.tmdb.org/t/p/w1280${item.item.backdrop_path}`}
						data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
					></video>
				</div>
				{list &&
					list.map((part, i) => {
						return (
							<Accordion
								style={{ marginTop: '5vh' }}
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
													{season.map(
														(episode, i) => {
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
																			i +
																			1
																		}`}
																		:{' '}
																		{
																			episode.name
																		}
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
																			aired
																			on:{' '}
																			{` ${episode.air_date}`}
																		</div>
																	) : (
																		''
																	)}
																</ListGroup.Item>
															);
														}
													)}
												</ListGroup>
											</Accordion.Body>
										</Accordion.Item>
									);
								})}
							</Accordion>
						);
					})}
				{data && (
					<div>
						<h3>Title: {data.original_title}</h3>
						<span>Tag: {data.tagline}</span>
						<p>Overview: {data.overview}</p>
						<span>duration: {data.runtime} minutes</span>
					</div>
				)}
			</div>
		</div>
	);
}
{
	/* <ReactPlayer
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
			/> */
}
{
	/* <div class='background'>
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
			</div> */
}
{
	/* <div>Player</div> */
}
{
	/* <div data-vjs-player> */
}
{
	/* <div
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
			</div> */
}

// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.min.css';
// import './Player.css';

// export default function Player() {
// 	const videoRef = useRef(null);

// 	useEffect(() => {
// 		// Check if the video element is present in the DOM
// 		if (videoRef.current) {
// 			const player = videojs(videoRef.current, {
// 				controls: true,
// 				autoplay: false,
// 				fluid: true,
// 			});
// 			player.src('https://vjs.zencdn.net/v/oceans.mp4');
// 		}
// 	}, [videoRef]);

// 	return (
// 		<div>
// 			<video
// 				ref={videoRef}
// 				className='video-js vjs-default-skin'
// 				id='my_video_1'
// 				// className='video-js vjs-default-skin'
// 				width='640px'
// 				height='267px'
// 				controls
// 				preload='none'
// 				poster='http://content.bitsontherun.com/thumbs/3XnJSIm4-480.jpg'
// 				data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
// 			></video>
// 		</div>
// 	);
// }
