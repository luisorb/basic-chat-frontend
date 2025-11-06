// frontend/src/components/UserList.jsx
import React from 'react';
import './UserList.css';

const UserList = ({ users, isVisible, onClose }) => {
    // Función para obtener las iniciales del usuario
    const getInitials = (username) => {
        return username
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    };

    // Función para generar un color único basado en el nombre de usuario
    const getUserColorIndex = (username) => {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % 8; // 8 colores diferentes
    };

    const userListClasses = `user-list ${isVisible ? 'visible' : ''}`;

    return (
        <aside className={userListClasses}>
            <div className="panel-header">
                <span>Usuarios Activos ({users.length})</span>
                <button className="close-panel-btn" onClick={onClose}>✖</button>
            </div>
            <ul className='list-users-container'>
                {users.map((user, index) => {
                    const initials = getInitials(user);
                    const colorIndex = getUserColorIndex(user);
                    
                    return (
                        <li key={user} className="user-item">
                            <div 
                                className="user-avatar"
                                data-user={colorIndex}
                                title={user}
                            >
                                {initials}
                                <div className="user-status" title="En línea"></div>
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user}</span>
                                <span className="user-status-text">En línea</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default UserList;