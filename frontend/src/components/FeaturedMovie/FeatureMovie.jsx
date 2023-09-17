import React from 'react';
import './FeatureMovie.css';
// import FeaturedMovie from '.';

export default function FeatureMovie({ item }) {
	// console.log(item, '---------------------------------------');

	// let firstDate = new Date(item.first_air_date);
	let firstDate = new Date(
		item.release_date ? item.release_date : item.last_air_date
	);
	let genres = [];
	for (let i in item.genres) {
		genres.push(item.genres[i].name);
	}
	// console.log(item.name, '+++++++++++++++++++++++++++++===');
	let description = item.overview;
	if (description.length > 200) {
		description = description.substring(0, 200) + '...';
	}

	return (
		<section
			className='featured'
			style={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`,
			}}
		>
			<div className='featured--vertical'>
				<div className='featured--horizontal'>
					<div className='featured--name'>
						{item.original_title ? item.original_title : item.name}
					</div>
					<div className='featured--info'>
						<div className='featured--points'>
							{item.vote_average} Rated
						</div>
						<div className='featured--year'>
							{firstDate.getFullYear()}
						</div>
						{/* { if}
                        <div className="featured--seasons">{item.number_of_seasons} seasons{item.number_of_seasons !== 1 ? 's' : ''}</div> */}
					</div>
					<div className='featured--description'>{description}</div>
					<div className='featured--buttons'>
						<a
							className='featured--watchbutton'
							href={'/player'}
						>
							▶ play
						</a>
						<a
							className='featured--mylistbutton'
							href={`/list/add/${item.id}`}
						>
							+Add
						</a>
					</div>
					<div className='featured--genres'>
						{' '}
						<strong>Genres</strong> {genres.join(', ')}
					</div>
				</div>
			</div>
		</section>
	);
}
