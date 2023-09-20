import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import Tmdb from '../Tmdb';
export default function SearchBar({ queryHandler, searchHandler }) {
	const [query, setQuery] = useState('');
	const [isInputVisible, setIsInputVisible] = useState(false);
	useEffect(() => {
		if (query.length != 0) {
			searchHandler(true);
			Tmdb.getSearchResults(query).then((data) => queryHandler(data));
		} else {
			setTimeout(() => {
				// if(query.length==0)
				setIsInputVisible(false);
				// }
			}, 3000);
			searchHandler(false);
		}
	}, [query]);
	return (
		<div className='search-bar-container'>
			<button
				className='search-btn'
				onClick={() => {
					// if (isInputVisible) {
					// searchHandler(false);
					// }
					if (!isInputVisible) setIsInputVisible(!isInputVisible);
				}}
			></button>
			<input
				value={query}
				onChange={(e) => {
					setIsInputVisible(true);
					setQuery(e.target.value);
				}}
				className={`search-bar${isInputVisible ? ' visible' : ''}`}
				type='text'
				autoFocus='true'
			/>
		</div>
	);
}
