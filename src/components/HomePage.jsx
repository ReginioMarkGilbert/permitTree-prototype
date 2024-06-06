import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';
import denrLogo from '../assets/denr-logo.png'; // Ensure the path to the logo is correct

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/permits'); // Navigate to the PermitsPage
    };

    return (
        <div className="welcome-page">
            <div className="welcome-container">
                <img src={denrLogo} alt="DENR Logo" className="denr-logo" />
                <h1>Welcome to DENR</h1>
                <p>Department of Environment and Natural Resources</p>
                <p>Committed to the protection, conservation, and management of the environment and natural resources for the present and future generations.</p>
                <button className="get-started-button" onClick={handleGetStartedClick}>Get Started</button>
            </div>
        </div>
    );
};

export default WelcomePage;