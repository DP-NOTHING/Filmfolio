import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
import Tmdb from '../Tmdb/index';
export default function Player() {
	// getting id from my current locations
	const id = useLocation().pathname.split('/')[2];
	const [list, setList] = useState([]);
	// getting whole item object sent from RowItem component while navigating
	const [poster, setPoster] = useState('');
	const item = useLocation().state;
	// console.log(item, '++++++++++');
	// distinguishing between tv show and movie by 'number_of_episodes'
	useEffect(() => {
		if (item.item.first_air_date) {
			let query = '';
			const main = [];
			Tmdb.getMovieInfo(item.item.id, 'tv').then((data) => {
				let start = 1;
				for (let i = 1; i <= data.info.seasons.length - 1; i++) {
					query += `season/${i},`;
					if ((i % 20 === 0) | (i == data.info.seasons.length - 1)) {
						Tmdb.getEpisodes(item.item.id, query).then((res) => {
							let myeps = [];
							console.log(start, i);
							for (let j = start; j <= i; j++) {
								console.log(
									res[`season/${j}`].episodes,
									'[[[[[[[[[[[[[[[[[['
								);
								if (res?.[`season/${j}`]) {
									myeps.push(res[`season/${j}`].episodes);
									// console.log(data[`season/${i}`].episodes);
								} else break;
							}
							// console.log('=>', main, myeps);
							main.push(myeps);
							if (i == data.info.seasons.length - 1) {
								// console.log('####################');
								// console.log(
								// 	main,
								// 	'@@@@@@@@@@@@@@/////////////@@@@'
								// );
								// setList(main);
							}
							start = i + 1;
							query = '';
						});
					}
				}
				// console.log(main, '**********************');
				// (() => {
				// })();
			});
		}
	}, []);
	// useEffect(() => {
	// 	console.log(item.poster_path);
	// 	setPoster(`https://image.tmdb.org/t/p/w300${item.poster_path}`);
	// }, [poster]);
	// console.log(item.item.poster_path);
	return (
		<>
			<div>Player</div>
			<div data-vjs-player>
				<video
					className='video-js'
					poster={`https://image.tmdb.org/t/p/w500${item.item.backdrop_path}`}
					// onPause={}
					controls
					src={`http://127.0.0.1:3000/stream/get-video/${id}`}
				></video>
				{/* {list.map((data, i) => {
					// console.log(data, '####$$$$$$$$$$$$');
					return (
						<>
							<h1>season {i + 1}</h1>
							{data.map((eps) => {
								eps.map((ep) => {
									return (
										<div>
											<h4 style={{ color: 'white' }}>
												{ep.name}
											</h4>
											<span style={{ color: 'white' }}>
												{ep.overview}
											</span>
										</div>
									);
								});
							})}
						</>
					);
				})} */}
			</div>
		</>
		// <videojs></videojs>
	);
}
