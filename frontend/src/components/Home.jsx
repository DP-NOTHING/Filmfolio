import React, { useEffect, useState } from 'react';
import '../App.css';
import './home.css';
import Tmdb from './Tmdb';
import MovieRow from './MovieRow/MovieRow';
import FeatureMovie from './FeaturedMovie/FeatureMovie';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Home() {
	const [movieList, setMovieList] = useState([]);
	const [featureData, setfeatureData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);
	const [movieSwitch, setMovieSwitch] = useState(true); // for switching movie and tv shows page
	const movieSwitchHandler = () => {
		setMovieSwitch(!movieSwitch);
	};
	useEffect(() => {
		const loadAllMovies = async () => {
			console.log('hello');
			// console.log(movieSwitch);
			//Pegando a lista TOTAL
			let list = await Tmdb.getMovieHomeList();
			setMovieList(list);
			//Pegando o Filme em Destaque
			// let originals = list.filter((i) => i.slug === 'originals');
			let trending = list.filter((i) => i.slug === 'trending');
			let randomChosen = Math.floor(
				Math.random() * (trending[0].items.results.length - 1)
			);
			let chosen = trending[0].items.results[randomChosen];
			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'movie');
			setfeatureData(chosenInfo);
		};
		const loadAllTvShows = async () => {
			// setMovieList([]);
			let list = await Tmdb.getTvShowList();
			// console.log(list);
			setMovieList(list);
			let trending = list.filter((i) => i.slug === 'trending');
			let randomChosen = Math.floor(
				Math.random() * (trending[0].items.results.length - 1)
			);
			let chosen = trending[0].items.results[randomChosen];
			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
			// console.log(chosenInfo);
			setfeatureData(chosenInfo);
		};
		if (movieSwitch == true) {
			loadAllMovies();
		} else {
			loadAllTvShows();
		}
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
				black={blackHeader}
				movieSwitch={movieSwitch}
				movieSwitchHandler={movieSwitchHandler}
			/>

			{featureData && <FeatureMovie item={featureData} />}

			<section className='lists'>
				{movieList.length &&
					movieList.map((item, key) => (
						<MovieRow
							key={key}
							title={item.title}
							items={item.items}
						/>
					))}
			</section>

			{/* <Footer /> */}

			{movieList.length <= 0 && (
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
