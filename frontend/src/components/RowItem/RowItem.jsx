import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoWItem.css';
export default function RowItem(props) {
	function fun(e) {
		props.hoverHandler(props.info);
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
