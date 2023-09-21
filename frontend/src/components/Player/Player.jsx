import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
import Tmdb from '../Tmdb/index';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

export default function Player() {
	// getting id from my current locations
	const id = useLocation().pathname.split('/')[2];
	const [list, setList] = useState(null);
	const [data, setData] = useState(null);
	// getting whole item object sent from RowItem component while navigating
	const [poster, setPoster] = useState('');
	const item = useLocation().state;
	// console.log(item);
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
			setList(main);
		} else {
			const data = await Tmdb.getMovieInfo(item.item.id, 'movie');
			console.log(data.info);
			setData(data.info);
		}
	};
	useEffect(() => {
		getList();
	}, []);
	return (
		<>
			<div>Player</div>
			<div data-vjs-player>
				<video
					className='video-js'
					poster={`https://image.tmdb.org/t/p/w500${item.item.backdrop_path}`}
					controls
					src={`http://127.0.0.1:3000/stream/get-video/${id}`}
				></video>
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
													{season.map(
														(episode, i) => {
															console.log(
																episode
															);
															return (
																<ListGroup.Item
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
					<>
						<h3>Title: {data.original_title}</h3>
						<span>Tag: {data.tagline}</span>
						<p>Overview: {data.overview}</p>
						<span>duration: {data.runtime} minutes</span>
					</>
				)}
			</div>
		</>
		// <videojs></videojs>
	);
}
