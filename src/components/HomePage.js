import React from 'react';
import './HomePage.css';

const HomePage = ({ onApply }) => {
    return (
        <div className="page">
            <div className="center-box">
                <h3>Chainsaw registration</h3>
                <p>Application for Chainsaw registration</p>
                <button className="apply-button" onClick={onApply}>APPLY</button>
            </div>
        </div>
    );
};

export default HomePage;
