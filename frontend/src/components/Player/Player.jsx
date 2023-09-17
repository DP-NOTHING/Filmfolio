import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
export default function Player() {
	// getting id from my current locations
	const id = useLocation().pathname.split('/')[2];
	// getting whole item object sent from RowItem component while navigating
	const [poster, setPoster] = useState('');
	const item = useLocation().state;
	// useEffect(() => {
	// 	console.log(item.poster_path);
	// 	setPoster(`https://image.tmdb.org/t/p/w300${item.poster_path}`);
	// }, [poster]);
	console.log(item.item.poster_path);
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
			</div>
		</>
		// <videojs></videojs>
	);
}
