import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './styles/AdminPage.css';
import UpdateForm from './UpdateForm';
import backHome from '../assets/back_home.svg';
import filter from '../assets/Filter.svg';
import refreshIcon from '../assets/refresh_page_icn.svg';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminPage = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [treeData, setTreeData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Trees Cut',
                data: [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });
    const [timeFrame, setTimeFrame] = useState('Time Frame');
    const [newTreeDate, setNewTreeDate] = useState('');
    const [newTreeCount, setNewTreeCount] = useState('');
    const dropdownRef = useRef(null);

    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newBrand, setNewBrand] = useState('');
    const [newModel, setNewModel] = useState('');
    const [newSerialNumber, setNewSerialNumber] = useState('');
    const [newDateOfAcquisition, setNewDateOfAcquisition] = useState('');
    const [newPowerOutput, setNewPowerOutput] = useState('');
    const [newFileNames, setNewFileNames] = useState([]);
    const [newStore, setNewStore] = useState('');

    const navigate = useNavigate(); // Initialize navigate using useNavigate hook

    const fetchApplications = useCallback(async () => {
        try {
            const response = await fetch(`/.netlify/functions/api/getApplications?sort=${sortOption}`);
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
                setFilteredApplications(data);
            } else {
                console.error('Failed to fetch applications', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [sortOption]);

    const fetchTreeData = useCallback(async () => {
        try {
            const response = await fetch(`/.netlify/functions/api/getTreeData?timeFrame=${timeFrame}`);
            if (response.ok) {
                const data = await response.json();
                const labels = data.map(item => new Date(item.date).toLocaleDateString());
                const counts = data.map(item => item.count);
                setTreeData({
                    labels,
                    datasets: [
                        {
                            label: 'Number of Trees Cut',
                            data: counts,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                        },
                    ],
                });
            } else {
                console.error('Failed to fetch tree data', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [timeFrame]);

    useEffect(() => {
        fetchApplications();
        fetchTreeData();
    }, [fetchApplications, fetchTreeData]);

    const handleSearchAndFilter = useCallback(() => {
        let filtered = applications.filter(application =>
            application.customId.includes(searchInput)
        );

        if (sortOption === 'id-asc') {
            filtered.sort((a, b) => a.customId.localeCompare(b.customId));
        } else if (sortOption === 'id-desc') {
            filtered.sort((a, b) => b.customId.localeCompare(a.customId));
        } else if (sortOption === 'date-asc') {
            filtered.sort((a, b) => new Date(a.dateOfSubmission) - new Date(b.dateOfSubmission));
        } else if (sortOption === 'date-desc') {
            filtered.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
        } else if (sortOption.startsWith('status-')) {
            const status = sortOption.split('-').slice(1).join(' ').toLowerCase().trim();
            filtered = filtered.filter(application => application.status.toLowerCase().trim() === status);
        }

        setFilteredApplications(filtered);
    }, [applications, searchInput, sortOption]);

    useEffect(() => {
        handleSearchAndFilter();
    }, [searchInput, sortOption, applications, handleSearchAndFilter]);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        setIsDropdownVisible(false); // Hide dropdown after selection
    };

    const handleUpdateClick = (application) => {
        setSelectedApplication(application);
        setNewName(application.name);
        setNewAddress(application.address);
        setNewPhone(application.phone);
        setNewBrand(application.brand);
        setNewModel(application.model);
        setNewSerialNumber(application.serialNumber);
        setNewDateOfAcquisition(application.dateOfAcquisition);
        setNewPowerOutput(application.powerOutput);
        setNewFileNames(application.fileNames || []);
        setNewStore(application.store);
        setShowUpdateForm(true);
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();

        const updatedApplication = {
            name: newName,
            address: newAddress,
            phone: newPhone,
            brand: newBrand,
            model: newModel,
            serialNumber: newSerialNumber,
            dateOfAcquisition: newDateOfAcquisition,
            powerOutput: newPowerOutput,
            fileNames: newFileNames,
            store: newStore
        };

        try {
            const response = await fetch(`/.netlify/functions/api/updateApplication/${selectedApplication._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedApplication),
            });

            if (response.ok) {
                await fetchApplications();
                setShowUpdateForm(false);
                setSelectedApplication(null);
            } else {
                console.error('Failed to update application', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/api/deleteApplication/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchApplications();
            } else {
                console.error('Failed to delete application', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/.netlify/functions/api/updateApplication/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                await fetchApplications();
            } else {
                console.error('Failed to update status', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRefreshClick = () => {
        fetchApplications();
        fetchTreeData();
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the home page
    };

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const handleAddTreeData = async () => {
        try {
            const response = await fetch('/.netlify/functions/api/addTreeData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: newTreeDate,
                    count: parseInt(newTreeCount, 10)
                })
            });
            if (response.ok) {
                setNewTreeDate('');
                setNewTreeCount('');
                fetchTreeData(); // Refresh the graph data
            } else {
                console.error('Failed to add tree data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="admin-page">
            <div className="home-button" onClick={handleHomeClick}>
                <img src={backHome} alt="Home" />
            </div>
            <h2>Admin Dashboard</h2>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-bar"
                />
                <div className="filter-container">
                    <img src={filter} alt="Filter" className="filter-icon" onClick={toggleDropdown} />
                    {isDropdownVisible && (
                        <select
                            ref={dropdownRef}
                            value={sortOption}
                            onChange={handleSortChange}
                            className="filter-dropdown"
                        >
                            <option value="">Sort By</option>
                            <option value="id-asc">ID Ascending</option>
                            <option value="id-desc">ID Descending</option>
                            <option value="date-asc">Date Ascending</option>
                            <option value="date-desc">Date Descending</option>
                            <option value="status-for-review">For Review</option>
                            <option value="status-accepted">Accepted</option>
                            <option value="status-in-progress">In Progress</option>
                            <option value="status-approved">Approved</option>
                            <option value="status-rejected">Rejected</option>
                        </select>
                    )}
                </div>
                <img src={refreshIcon} alt="Refresh" className="refresh-icon" onClick={handleRefreshClick} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Application Type</th>
                        <th>Application ID</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((application) => (
                        <tr key={application._id}>
                            <td>Chainsaw Application</td>
                            <td>{application.customId}</td>
                            <td>
                                {new Date(application.dateOfSubmission).toLocaleDateString()} | {
                                new Date(application.dateOfSubmission).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </td>
                            <td>
                                <select
                                    className={`status-dropdown ${application.status.toLowerCase().replace(' ', '-')}`}
                                    value={application.status}
                                    onChange={(e) => handleStatusChange(application._id, e.target.value)}
                                >
                                    <option value="For Review">For Review</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>

                            <td>
                                <button className='update_button' onClick={() => handleUpdateClick(application)}>Update Form</button>
                                <button className='delete_button' onClick={() => handleDeleteClick(application._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showUpdateForm && (
                <UpdateForm
                    newName={newName}
                    setNewName={setNewName}
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    newPhone={newPhone}
                    setNewPhone={setNewPhone}
                    newBrand={newBrand}
                    setNewBrand={setNewBrand}
                    newModel={newModel}
                    setNewModel={setNewModel}
                    newSerialNumber={newSerialNumber}
                    setNewSerialNumber={setNewSerialNumber}
                    newDateOfAcquisition={newDateOfAcquisition}
                    setNewDateOfAcquisition={setNewDateOfAcquisition}
                    newPowerOutput={newPowerOutput}
                    setNewPowerOutput={setNewPowerOutput}
                    newFileNames={newFileNames}
                    setNewFileNames={setNewFileNames}
                    newStore={newStore}
                    setNewStore={setNewStore}
                    handleUpdateSubmit={handleUpdateSubmit}
                    setShowUpdateForm={setShowUpdateForm}
                />
            )}

            <div className="graph-container">
                <h3>Tree Data</h3>
                <Line data={treeData} className="tree-graph"/>
                <div className="time-frame-select">
                    <select value={timeFrame} onChange={handleTimeFrameChange} className="time-frame-dropdown">
                        <option value="">Time Frame</option>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div className="add-tree-data-form">
                    <h2 className='add-tree-data-title'>Add Tree Data</h2>
                    <div className="input-container">
                        <input
                            type="date"
                            value={newTreeDate}
                            onChange={(e) => setNewTreeDate(e.target.value)}
                            className="input-date"
                        />
                        <input
                            type="number"
                            placeholder="Count"
                            value={newTreeCount}
                            onChange={(e) => setNewTreeCount(e.target.value)}
                            className="input-count"
                        />
                        <button onClick={handleAddTreeData} className="add-data-button">Add Tree Data</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
