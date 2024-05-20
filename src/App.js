import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ApplicationForm from './components/ApplicationForm';
import MessageBox from './components/MessageBox';
import StatusPage from './components/StatusPage';
import Header from './components/Header';
import './App.css';

const App = () => {
    const [page, setPage] = useState('home');
    const [applicationId, setApplicationId] = useState(null);

    const handleApply = () => setPage('form');
    const handleSubmit = (id) => {
        setApplicationId(id);
        setPage('message');
    };
    const handleViewStatus = () => setPage('status');

    return (
        <div>
            <Header />
            {page === 'home' && <HomePage onApply={handleApply} />}
            {page === 'form' && <ApplicationForm onSubmit={handleSubmit} />}
            {page === 'message' && <MessageBox onViewStatus={handleViewStatus} />}
            {page === 'status' && <StatusPage applicationId={applicationId} />}
        </div>
    );
};

export default App;
