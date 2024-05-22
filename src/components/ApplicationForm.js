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
            brand,
            model,
            serialNumber,
            dateOfAcquisition,
            powerOutput
        };

        try {
            const response = await fetch('https://permittree-api.netlify.app/.netlify/functions/api/createApplication', {
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
                <div className="form-section">
                    <h4 className='form-title'>Owner Details</h4>
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
                </div>

                <div id="chainsaw-details" className="form-section">
                    <h4 className='form-title'>Chainsaw Details</h4>
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Enter Brand"
                        // pattern="[A-Za-z0-9 ]+"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        title="Brand can include letters and numbers"
                        required
                    />

                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Enter Model"
                        // pattern="[A-Za-z0-9 ]+"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        title="Model can include letters and numbers"
                        required
                    />

                    <label htmlFor="serialNumber">Serial No.</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        placeholder="Enter Serial Number"
                        // pattern="[A-Za-z0-9]+"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        title="Serial Number can include letters and numbers"
                        required
                    />

                    <label htmlFor="dateOfAcquisition">Date of Acquisition</label>
                    <input
                        type="date"
                        id="dateOfAcquisition"
                        name="dateOfAcquisition"
                        value={dateOfAcquisition}
                        onChange={(e) => setDateOfAcquisition(e.target.value)}
                        required
                    />

                    <label htmlFor="powerOutput">Power Output (kW/bhp)</label>
                    <input
                        type="text"
                        id="powerOutput"
                        name="powerOutput"
                        placeholder="e.g. 5 kW or 6.7 bhp"
                        // pattern="[0-9.]+ (kW|bhp)"
                        title="Enter power output in kW or bhp"
                        value={powerOutput}
                        onChange={(e) => setPowerOutput(e.target.value)}
                        required
                    />
                </div>

                <div className="file-upload-container">
                    <label className='label-file'>Upload image/s of requirements</label>
                    <input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        accept="image/*,.pdf,.docx"
                        multiple
                        onChange={handleFileChange}
                        max="5" // Maximum number of files allowed
                    />
                    <button className="file-upload-label"onClick={() => document.getElementById('fileUpload').click()}>
                        <img src={uploadIcon} alt="Upload Icon"/>
                        Add file
                    </button>
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