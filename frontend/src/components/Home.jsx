import React, { useEffect, useState } from 'react';
import '../App.css';
import './home.css';
import Tmdb from './Tmdb';
import MovieRow from './MovieRow/MovieRow';
import FeatureMovie from './FeaturedMovie/FeatureMovie';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Home(){

  const [movieList, setMovieList] = useState([]);
  const [featureData, setfeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  
  
  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();  
      setMovieList(list);
      

      //Pegando o Filme em Destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let trending = list.filter(i=>i.slug === 'trending');
      let randomChosen = Math.floor(Math.random() * (trending[0].items.results.length -1));
      let chosen = trending[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovierInfo(chosen.id, 'movie');
      setfeatureData(chosenInfo);

    }
    
    loadAll();
  }, []);


  useEffect (() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])


  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => ( 
          <MovieRow key={key} title={item.title} items={item.items}  />
        ))}
      </section>
      
      {/* <Footer /> */}

      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading..." />
      </div>
      }

      <Footer/>
      
    </div>
  )
}


