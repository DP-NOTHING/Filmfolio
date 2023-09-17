import React, { useState } from 'react';
import './SearchBar.css';
export default function SearchBar() {
	return (
		<div className='search-bar-container'>
			<input
				className='search-bar'
				type='text'
			/>
			<button className='search-btn'></button>
		</div>
	);
}
