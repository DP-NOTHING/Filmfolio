import React, { useRef, useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RowItem from '../RowItem/RowItem';


export default function MovieRow ({title, items})  {
    const[scrollX, setScrollX] = useState (0);


    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth /2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth /2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x) {
            x = ((window.innerWidth - listW) - 60);
        }
        setScrollX(x);
    };
    const handleScroll = (event) => {
        setScrollX(scrollX - event.deltaX);
    };
   
    return (
        <div className="movieRow" onWheel={handleScroll}>
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea"
           >
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150,
                    transform: `translateX(${scrollX}px)`,
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        // <div key={key} className="movieRow--item">
                        //     {/* <div  style={{borderRadius:"18px"}}> */}
                        //     <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} style={{borderRadius:"18px"}}/>
                        
                        // </div>
                        // <div>
                        <RowItem 
                                id={key}
                                key={key}
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.original_title}
                        />
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    )
}