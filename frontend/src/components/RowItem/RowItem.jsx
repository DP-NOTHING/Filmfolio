import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoWItem.css';
import Tmdb from '../Tmdb';
export default function RowItem(props) {
	function fun(e) {
		Tmdb.getMovieInfo(props.info.id, props.info.media_type).then((data) =>
			props.hoverHandler(data)
		);
	}
	const Navigate = useNavigate();
	return (
		<div
			key={props.id}
			className='movieRow--item'
			onMouseOver={fun}
			onClick={() => {
				// adding movie id to next route
				Navigate(`/player/${props.id}`, {
					state: {
						// sending whole item to player
						item: props.info,
					},
				});
			}}
		>
			{/* <div  style={{borderRadius:"18px"}}> */}
			<img
				src={props.src ? props.src : null}
				alt={props.alt}
				style={{ borderRadius: '18px' }}
			/>
		</div>
	);
}
