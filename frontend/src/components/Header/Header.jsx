import React from 'react';
import './Header.css';
import logo from "../../assets/logo2.png"
export default function Header ({black}){
    return (
        // <h1>hi</h1>
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="logo"    />
                </a>
            </div>
            <div className="header--user">
                <a href="/user">
                <img src="https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png" alt="" />
                </a>
            </div>
        </header>
    )
}