import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo2.png';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 70,
	height: 32,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(30px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('https://emoji.aranja.com/static/emoji-data/img-google-136/1f4fa.png')`,
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor:
					theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&:before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('https://emoji.aranja.com/static/emoji-data/img-google-136/1f3a5.png')`,
			backgroundSize: '20px 20px',
		},
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2,
	},
}));
export default function Header({ black, movieSwitch, movieSwitchHandler }) {
	return (
		// <h1>hi</h1>
		<header className={black ? 'black' : ''}>
			<div className='header--logo'>
				<a href='/'>
					<img
						src={logo}
						alt='logo'
					/>
				</a>
			</div>
			<MaterialUISwitch onChange={() => movieSwitchHandler()} />
			{movieSwitch == true ? <span>movie</span> : <span>tv shows</span>}
			<div className='header--user'>
				<a href='/user'>
					<img
						src='https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png'
						alt=''
					/>
				</a>
			</div>
		</header>
	);
}
