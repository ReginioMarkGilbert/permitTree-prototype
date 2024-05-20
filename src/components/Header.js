import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logo" className="logo-left" />
            <h1>
                Provincial Environment
                <span className="and"> and</span>
                <span className="sec_row">Natural Resources Office</span>
            </h1>
            <img src={logo} alt="Logo" className="logo-right" />
            <div className="rectangle">
                <h2>Online Forestry Services</h2>
            </div>
        </header>
    );
};

export default Header;
