import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PermitsPage.css';
// import adminIcon from '../assets/admin_icn.svg';
// import adminIconWhite from '../assets/admin_white.svg';

const HomePage = () => {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook

    const handleApplyClick = () => {
        navigate('/apply'); // Navigate to the StoreSelectionPage
    };

    return (
        <div className="page">
            <div className="grid-container">
                <div className="center-box">
                    <h3>Chainsaw registration</h3>
                    <p>Application for Chainsaw registration</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
                <div className="center-box">
                    <h3>Certificate of Verification</h3>
                    <p>Application for Certificate of Verification</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
                <div className="center-box">
                    <h3>Private Tree Plantation Registration</h3>
                    <p>Application for Private Tree Plantation Registration</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
                <div className="center-box">
                    <h3>Private Land Timber Permit</h3>
                    <p>Application for Private Land Timber Permit</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
                <div className="center-box">
                    <h3>Special Private Land Timber Permit</h3>
                    <p>Application for Special Private Land Timber Permit</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
                <div className="center-box">
                    <h3>Tree cutting permit 3</h3>
                    <p>Application for Tree cutting permit 3</p>
                    <button className="apply-button" onClick={handleApplyClick}>APPLY</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
