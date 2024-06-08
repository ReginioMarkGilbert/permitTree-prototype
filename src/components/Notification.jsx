import React, { useState, useEffect, useRef } from 'react';
import bellnotif from '../assets/bellnotif.svg';
import './styles/Notification.css';
import useClickOutside from '../hooks/useClickOutside';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setDropdownVisible(false));

    useEffect(() => {
        console.log('Fetching notifications...');
        fetch('https://permittree-api.netlify.app/.netlify/functions/api/notifications')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Ensure response is parsed as JSON
            })
            .then(data => {
                console.log('Fetched notifications:', data);
                setNotifications(data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    const markAsRead = (id) => {
        fetch(`https://permittree-api.netlify.app/.netlify/functions/api/notifications/${id}/read`, { method: 'PUT' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setNotifications(notifications.filter(notification => notification._id !== id));
            })
            .catch(error => {
                console.error('Error marking notification as read:', error);
            });
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const highlightStatus = (message) => {
        const statusWords = {
            'Accepted': 'status-accepted',
            'In Progress': 'status-in-progress',
            'Approved': 'status-approved',
            'Rejected': 'status-rejected',
            'For Review': 'status-for-review'
        };
        let highlightedMessage = message;
        Object.keys(statusWords).forEach(status => {
            const regex = new RegExp(`(${status})`, 'gi');
            highlightedMessage = highlightedMessage.replace(regex, `<span class="status-highlight ${statusWords[status]}">$1</span>`);
        });
        return { __html: highlightedMessage };
    };

    return (
        <div className="notification-icon-container" ref={dropdownRef}>
            <div className="notification-icon" onClick={toggleDropdown}>
                <img src={bellnotif} alt="Notifications" />
                {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </div>
            {dropdownVisible && (
                <div className="notification-dropdown">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification-item" onClick={() => markAsRead(notification._id)}>
                            <span dangerouslySetInnerHTML={highlightStatus(notification.message)} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
