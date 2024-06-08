import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import PermitsPage from './components/PermitsPage';
import StoreSelectionPage from './components/StoreSelectionPage';
import ApplicationForm from './components/ApplicationForm';
import MessageBox from './components/MessageBox';
import StatusPage from './components/StatusPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [selectedStore, setSelectedStore] = useState('');

    const handleStoreSelection = (store) => {
        setSelectedStore(store);
        navigate(`/apply/${store}`);
    };

    const handleSubmitApplication = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/api/createApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Application submitted:', data);
                navigate('/message'); // Navigate to the MessageBox component
            } else {
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewStatus = () => {
        navigate('/status');
    };

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/permits" element={<PermitsPage />} />
                <Route path="/apply" element={<StoreSelectionPage onContinue={handleStoreSelection} />} />
                <Route path="/apply/:store" element={<ApplicationForm onSubmit={handleSubmitApplication} selectedStore={selectedStore} />} />
                <Route path="/message" element={<MessageBox onViewStatus={handleViewStatus} />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
}

export default App;
