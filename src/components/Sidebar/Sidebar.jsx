import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentRoom, isVisible, onClose, username }) => {
    const availableRooms = ['general', 'desarrollo', 'offtopic']; 
    const sidebarClasses = `sidebar ${isVisible ? 'visible' : ''}`;

    // Función para obtener las iniciales del usuario
    const getInitials = (username) => {
        return username
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    };

    const initials = getInitials(username);

    return (
        <aside className={sidebarClasses}>
            <div className="panel-header">
                
                <button className="close-panel-btn-sidebar" onClick={onClose}>✖</button>
            </div>
            
            <div className="user-profile-sidebar">
                <div className="user-avatar-large-sidebar">
                    {initials}
                </div>
                <div className="user-info-sidebar">
                    <span className="user-name-sidebar">{username}</span>
                </div>
            </div>
            <span className='list-rooms-title'>Salas de Chat</span>
            <nav className='list-rooms'>
                {availableRooms.map(room => (
                    <div key={room} className={`room-item ${room === currentRoom ? 'active' : ''}`}>
                        {room}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;