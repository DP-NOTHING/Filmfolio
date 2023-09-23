import React, { useEffect, useState } from 'react';
import '../App.css';
import './home.css';
import Tmdb from './Tmdb';
import MovieRow from './MovieRow/MovieRow';
import FeatureMovie from './FeaturedMovie/FeatureMovie';
import Header from './Header/Header';
import Footer from './Footer/Footer';
export default function Home() {
	// const [query, setQuery] = useState('');
	const [hoveredItem, setHoveredItem] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [search, setSearch] = useState(false);
	const [movieList, setMovieList] = useState([]);
	const [featureData, setfeatureData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);
	const [movieSwitch, setMovieSwitch] = useState(
		localStorage.getItem('movieSwitch')
			? localStorage.getItem('movieSwitch')
			: 'movie'
	); // for switching movie and tv shows page
	const hoverHandler = (item) => {
		if (item.info) setHoveredItem(item);
	};
	const movieSwitchHandler = (movieSwitch) => {
		localStorage.setItem('movieSwitch', movieSwitch);
		setMovieSwitch(movieSwitch);
		setIsLoading(true);
	};
	const searchHandler = (setOrReset) => setSearch(setOrReset);
	const queryHandler = (data) => {
		setIsLoading(false);
		setSearchResult([data]);
	};
	useEffect(() => {
		const loadAllMovies = async () => {
			const link = await Tmdb.getTrailer();
			console.log(link);
			// console.log('hello');
			// console.log(movieSwitch);
			//Pegando a lista TOTAL
			let list = await Tmdb.getMovieHomeList();
			// console.log(list, '###############################');
			setMovieList(list);
			//Pegando o Filme em Destaque
			// let originals = list.filter((i) => i.slug === 'originals');
			let trending = list.filter((i) => i.slug === 'trending');
			// let info = null;
			while (true) {
				let randomChosen = Math.floor(
					Math.random() * (trending[0].items.results.length - 1)
				);
				let chosen = trending[0].items.results[randomChosen];
				let { info, trailer } = await Tmdb.getMovieInfo(
					chosen.id,
					'movie'
				);
				if (info) {
					setfeatureData({ info, trailer });
					break;
				}
			}
		};
		const loadAllTvShows = async () => {
			// setMovieList([]);
			let list = await Tmdb.getTvShowList();
			// console.log(list);
			setMovieList(list);
			let trending = list.filter((i) => i.slug === 'trending');
			while (true) {
				let randomChosen = Math.floor(
					Math.random() * (trending[0].items.results.length - 1)
				);
				let chosen = trending[0].items.results[randomChosen];
				let { info, trailer } = await Tmdb.getMovieInfo(
					chosen.id,
					'tv'
				);
				if (info) {
					setfeatureData({ info, trailer });
					break;
				}
			}
		};
		// const loadSearchResults = async () => {
		// 	// const data = await Tmdb.getSearchResults(query);
		// 	// console.log(data);
		// };
		if (movieSwitch == 'movie') {
			// Tmdb.getTrailer()
			// console.log();
			setIsLoading(true);
			loadAllMovies().then(() => setIsLoading(false));
		} else if (movieSwitch == 'tvshow') {
			setIsLoading(true);
			loadAllTvShows().then(() => setIsLoading(false));
		}
		// if (search == true) {
		// 	loadSearchResults();
		// }
		// return () => clearInterval(id);
	}, [movieSwitch]);
	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		};

		window.addEventListener('scroll', scrollListener);

		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);
	return (
		<div className='page'>
			<Header
				setIsLoading={setIsLoading}
				searchHandler={searchHandler}
				queryHandler={queryHandler}
				black={blackHeader}
				// setLoading={setIsLoading}
				movieSwitch={movieSwitch}
				movieSwitchHandler={movieSwitchHandler}
			/>
			{!hoveredItem && featureData && <FeatureMovie item={featureData} />}
			{hoveredItem && <FeatureMovie item={hoveredItem} />}
			<section className='lists'>
				{!search &&
					movieList.length &&
					movieList.map((item, key) => (
						<MovieRow
							hoverHandler={hoverHandler}
							key={key}
							title={item.title}
							items={item.items}
						/>
					))}
				{search &&
					searchResult?.length &&
					searchResult.map((item, key) => (
						<MovieRow
							hoverHandler={hoverHandler}
							key={key}
							title={item.title}
							items={item.items}
						/>
					))}
			</section>

			{/* <Footer /> */}

			{isLoading && (
				<div className='loading'>
					<img
						src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif'
						alt='Loading...'
					/>
				</div>
			)}
			<Footer />
		</div>
	);
}
