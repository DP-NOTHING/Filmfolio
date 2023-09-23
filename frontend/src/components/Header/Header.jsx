import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo2.png';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import SearchBar from '../SearchBar/SearchBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
// 	width: 70,
// 	height: 32,
// 	padding: 9,
// 	'& .MuiSwitch-switchBase': {
// 		margin: 1,
// 		padding: 0,
// 		transform: 'translateX(6px)',
// 		'&.Mui-checked': {
// 			color: '#fff',
// 			transform: 'translateX(30px)',
// 			'& .MuiSwitch-thumb:before': {
// 				backgroundImage: `url('https://emoji.aranja.com/static/emoji-data/img-google-136/1f4fa.png')`,
// 			},
// 			'& + .MuiSwitch-track': {
// 				opacity: 1,
// 				backgroundColor:
// 					theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
// 			},
// 		},
// 	},
// 	'& .MuiSwitch-thumb': {
// 		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
// 		width: 32,
// 		height: 32,
// 		'&:before': {
// 			content: "''",
// 			position: 'absolute',
// 			width: '100%',
// 			height: '100%',
// 			left: 0,
// 			top: 0,
// 			backgroundRepeat: 'no-repeat',
// 			backgroundPosition: 'center',
// 			backgroundImage: `url('https://emoji.aranja.com/static/emoji-data/img-google-136/1f3a5.png')`,
// 			backgroundSize: '20px 20px',
// 		},
// 	},
// 	'& .MuiSwitch-track': {
// 		opacity: 1,
// 		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
// 		borderRadius: 20 / 2,
// 	},
// }));
export default function Header({
	black,
	movieSwitch,
	movieSwitchHandler,
	queryHandler,
	searchHandler,
	setIsLoading,
}) {
	// console.log(movieSwitch);
	return (
		// <h1>hi</h1>
		<header className={black ? 'black' : ''}>
			<div className='header--logo'>
				<a href='/home'>
					<img
						src={logo}
						alt='logo'
					/>
				</a>
			</div>
			<Navbar
				bg='transparent'
				variant='dark'
				expand='lg'
			>
				<Container>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link
								active={movieSwitch == 'movie' ? true : false}
								onClick={() => movieSwitchHandler('movie')}
							>
								Movies
							</Nav.Link>
							<Nav.Link
								active={movieSwitch == 'tvshow' ? true : false}
								onClick={() => movieSwitchHandler('tvshow')}
							>
								Tv Shows
							</Nav.Link>
							<Nav.Link
								active={
									movieSwitch == 'watchlist' ? true : false
								}
								onClick={() => movieSwitchHandler('watchlist')}
							>
								Watchlist
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{/* <MaterialUISwitch onChange={() => movieSwitchHandler()} /> */}
			{/* <div style={{ width: 80, fontWeight: 'bold', fontSize: 20 }}>
				{movieSwitch == true ? (
					<span>movie</span>
				) : (
					<span>tv shows</span>
				)}
			</div> */}
			<SearchBar
				searchHandler={searchHandler}
				queryHandler={queryHandler}
				setIsLoading={setIsLoading}
			/>
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
