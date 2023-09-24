import React, { useState, useEffect } from 'react';
import fileDownload from 'js-file-download';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import videojs from 'video.js';
import Tmdb from '../Tmdb/index';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { useRef } from 'react';
import 'video.js/dist/video-js.min.css';
import './Player.css';
import logo from '../../assets/logo2.png';
import Button from 'react-bootstrap/Button';
export default function Player() {
	// getting id from my current locations
	const uploadRef = useRef(null);
	const formRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [apiId, setApiId] = useState(null);
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
		// console.log(item);
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
			// console.log(main);
			setTrailer(data?.trailer);
			setList(main);
		} else {
			const data = await Tmdb.getMovieInfo(item.item.id, 'movie');
			setApiId(
				item.item.name + '-' + item.item.id + '-' + item.item.media_type
			);
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
			// videoPlayer.src(``);
			if (!isPlayerInitialized) {
				// Initialize the Video.js player
				const videoPlayer = videojs(player.current, {
					controls: true,
					autoplay: false,
					fluid: true,
				});
				videoPlayer.src(
					`http://127.0.0.1:3000/stream/get-video/${apiId}`
				);
				setIsPlayerInitialized(true);
			}
			setIsLoading(false);
		});
	}, []);
	const handleFileUpload = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			const formData = new FormData();
			formData.append('video', selectedFile);
			setIsLoading(true);
			axios
				.post(
					`http://127.0.0.1:3000/upload/upload-video/${apiId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data;',
						},
					}
				)
				.then(function (response) {
					setIsLoading(false);
					// console.log(
					// 	response.data,
					// 	'dddddddddddddddddddddddddddddddd'
					// );
				})
				.catch(function (error) {
					console.error(error, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
				});
		}
	};

	const uploadHandler = () => {
		uploadRef.current.click();
	};
	const downloadHandler = () => {
		setIsLoading(true);
		axios
			.get(`http://127.0.0.1:3000/stream/get-video/${apiId}/download`, {
				responseType: 'blob', // Set the response type to 'blob'
			})
			.then(function (response) {
				fileDownload(response.data, 'test.mp4');
				setIsLoading(false);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	const trailerHandler = () => {};
	const watchlistHandler = () => {};

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
						marginTop: '7vh',
					}}
				>
					<video
						src={`http://127.0.0.1:3000/stream/get-video/${apiId}`}
						ref={player}
						className='video-js vjs-default-skin'
						width='640px'
						height='267px'
						controls
						preload='none'
						poster={
							item.item.backdrop_path
								? `https://image.tmdb.org/t/p/w1280${item.item.backdrop_path}`
								: 'https://cdn-icons-png.flaticon.com/512/3163/3163508.png'
						}
						data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
					></video>
				</div>
				<div
					style={{
						marginLeft: '5vw',
						marginRight: '5vw',
						width: '90vw',
						display: 'flex',
						justifyContent: 'space-between', // Aligns items at the start and end of the row
					}}
				>
					<div>
						<Button
							style={{ color: 'white', border: 'none' }}
							variant='outline-danger'
							className='p-2 m-4'
							onClick={uploadHandler}
							onMouseOver={(e) =>
								(e.currentTarget.style.color = 'black')
							}
							onMouseOut={(e) =>
								(e.currentTarget.style.color = 'white')
							}
						>
							upload{' '}
							<img
								height={'32px'}
								width={'32px'}
								src='https://cdn1.iconfinder.com/data/icons/web-seo-5/91/SEODevelopment__Marketing_063-512.png'
								alt=''
							/>
						</Button>
						{/* getting input field to get file */}
						{/* <form
							ref={formRef}
							style={{ display: 'none' }}
							method='post'
							encType='multipart/form-data'
							action='http://127.0.0.1:3000/upload/upload-video'
						> */}
						<input
							ref={uploadRef}
							type='file'
							accept='video/*'
							style={{ display: 'none' }}
							onChange={handleFileUpload}
						/>
						{/* </form> */}
						<Button
							style={{ color: 'white', border: 'none' }}
							variant='outline-danger'
							className='p-2 m-4'
							onClick={downloadHandler}
							onMouseOver={(e) =>
								(e.currentTarget.style.color = 'black')
							}
							onMouseOut={(e) =>
								(e.currentTarget.style.color = 'white')
							}
						>
							download{' '}
							<img
								height={'32px'}
								width={'32px'}
								src='https://cdn4.iconfinder.com/data/icons/e-learning-color/64/download-video-material-512.png'
								alt=''
							/>
						</Button>
						<Button
							style={{ color: 'white', border: 'none' }}
							variant='outline-danger'
							className='p-2 m-4'
							onClick={watchlistHandler}
							onMouseOver={(e) =>
								(e.currentTarget.style.color = 'black')
							}
							onMouseOut={(e) =>
								(e.currentTarget.style.color = 'white')
							}
						>
							add to watchlist{' '}
							<img
								height={'32px'}
								width={'32px'}
								src='https://cdn0.iconfinder.com/data/icons/video-player-4/100/video_movie_clip_player-09-512.png'
								alt=''
							/>
						</Button>
					</div>
					<Button
						// className='mr-2'
						className='p-2 m-4'
						style={{ border: 'none' }}
						variant='outline-light'
						onClick={trailerHandler}
						onMouseOver={(e) =>
							(e.currentTarget.style.color = 'black')
						}
						onMouseOut={(e) =>
							(e.currentTarget.style.color = 'white')
						}
					>
						<img
							height={'32px'}
							width={'32px'}
							src='https://cdn4.iconfinder.com/data/icons/cinema-157/496/movie-player-video-media-watch-512.png'
							alt=''
						/>{' '}
						watch trailer
					</Button>
				</div>
				{list &&
					list.map((part, i) => {
						return (
							<Accordion
								data-bs-theme='dark'
								key={i}
							>
								{part.map((season) => {
									return !season.length ? (
										<></>
									) : (
										<Accordion.Item
											style={{ marginTop: '0.7vh' }}
											eventKey={
												season[0]
													? `${season[0].season_number}`
													: new Date().toString()
											}
										>
											<Accordion.Header>
												Season{' '}
												{season[0]
													? `${season[0].season_number}`
													: new Date().toString()}
											</Accordion.Header>

											<Accordion.Body
												key={
													season[0]
														? `${season[0].season_number}`
														: new Date().toString()
												}
											>
												<ListGroup>
													{season.map(
														(episode, i) => {
															// console.log(epis);
															return (
																<ListGroup.Item
																	variant='dark'
																	action
																	onClick={() => {
																		setApiId(
																			item
																				.item
																				.name +
																				'-' +
																				item
																					.item
																					.id +
																				'-' +
																				item
																					.item
																					.media_type +
																				'-' +
																				episode.id
																		);
																	}}
																	key={
																		season[0]
																			.season_number
																			? `${season[0].season_number}-${episode.episode_number}`
																			: new Date.toString()
																	}
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
					<div style={{ marginTop: '0.7vh' }}>
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
