import React, { useState } from 'react';
import paperclip from '../assets/paperclip.svg';
import './ApplicationForm.css';

const ApplicationForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileNamesArray = Array.from(files).map(file => file.name);
        setFileNames(fileNamesArray);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            name,
            address,
            phone,
        };

        try {
            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Application submitted:', data);
                onSubmit(data._id);  // Pass the ID to the parent component
            } else {
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <h3>Apply for Chainsaw Registration</h3>
            <form id="registrationForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Barangay, Bayan, Probinsya"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. 09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label htmlFor="fileUpload">Upload image/s of requirements</label>
                <div className="file-upload-container">
                    <input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        accept="image/*,.pdf"
                        multiple
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileUpload" className="file-upload-label">
                        <img src={paperclip} alt="Upload Icon" />
                        Choose Files
                    </label>
                </div>
                <div id="fileNames" className="file-names">
                    {fileNames.map((fileName, index) => (
                        <div key={index} className="file-name">{fileName}</div>
                    ))}
                </div>

                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ApplicationForm;
