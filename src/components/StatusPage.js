import React, { useState, useEffect } from 'react';
import './StatusPage.css';

const StatusPage = ({ applicationId }) => {
    const [applications, setApplications] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/applications');
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateClick = (application) => {
        setSelectedApplication(application);
        setNewName(application.name);
        setNewAddress(application.address);
        setNewPhone(application.phone);
        setShowUpdateForm(true);
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/applications/${selectedApplication._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName, address: newAddress, phone: newPhone }),
            });

            if (response.ok) {
                await fetchApplications();
                setShowUpdateForm(false);
                setSelectedApplication(null);
            } else {
                console.error('Failed to update application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchApplications();
            } else {
                console.error('Failed to delete application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="status-page">
            <h2>Application Status</h2>
            <table>
                <thead>
                    <tr>
                        <th>Application Type</th>
                        <th>Application ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <tr key={application._id}>
                            <td>Chainsaw Application</td>
                            <td>{application._id}</td>
                            <td><span className={`status ${application.status.toLowerCase()}`}>{application.status}</span></td>
                            <td>
                                <button className='update-form-button' onClick={() => handleUpdateClick(application)}>Update Form</button>
                                <button className='delete-form-button' onClick={() => handleDeleteClick(application._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showUpdateForm && (
                <div className="update-form-popup">
                    <form onSubmit={handleUpdateSubmit}>
                        <label htmlFor="newName">New Name</label>
                        <input
                            type="text"
                            id="newName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                        <label htmlFor="newAddress">New Address</label>
                        <input
                            type="text"
                            id="newAddress"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            required
                        />
                        <label htmlFor="newPhone">New Phone Number</label>
                        <input
                            type="tel"
                            id="newPhone"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            required
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StatusPage;
