import React from 'react'
import "./RoWItem.css"
export default function RowItem(props) {

    function fun(){
       console.log("hovered on item") ;
    //    Navigate("/",state[]);
    }

    return (
        <div key={props.id} className="movieRow--item" onMouseOver={fun}>
            {/* <div  style={{borderRadius:"18px"}}> */}
            <img src={props.src} alt={props.alt} style={{ borderRadius: "18px" }} />

        </div>
    )
}
