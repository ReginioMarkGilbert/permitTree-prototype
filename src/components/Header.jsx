import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/denr-logo.png';
import profilePic from '../assets/profile-pic.svg';
import envelope from '../assets/envelope.svg';
import Notification from './Notification';
import './styles/Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1 className="logo-text">Forestry Services</h1>
            </div>
            <nav className="nav-links">
                <Link to="/" style={{fontSize: "18px"}}>Home</Link>
                <Link to="/permits" style={{fontSize: "18px"}}>Apply</Link>
                <Link to="/status" style={{fontSize: "18px"}}>Status</Link>
                <Link to="/admin" style={{fontSize: "18px"}}>Admin</Link>
            </nav>
            <div className="right-container">
                <img src={envelope} alt="Envelope" className="icon" />
                <Notification />
                <div className="profile">
                    <img src={profilePic} alt="Profile" />
                    <span>John Forest</span>
                    <i className="bx bx-chevron-down"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
