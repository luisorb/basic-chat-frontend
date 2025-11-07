import React, { useState } from 'react';
import MessageArea from '../MessageArea/MessageArea';
import MessageInput from '../MessageInput/MessageInput';
import Sidebar from '../Sidebar/Sidebar';
import UserList from '../UserList/UserList';
import './ChatContainer.css'

const ChatContainer = ({ messages, onlineUsers, sendMessage, isConnected, username }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        setShowUsers(false);
    };

    const toggleUsers = () => {
        setShowUsers(!showUsers);
        setShowSidebar(false);
    };

    const closePanels = () => {
        setShowSidebar(false);
        setShowUsers(false);
    };

    return (
        <div className="chat-container">
            <Sidebar currentRoom="general" isVisible={showSidebar} onClose={closePanels} username={username} />

            <div className="main-chat-area">
                <header className="chat-header">
                    <div className="header-title-area">
                        <button
                            className="header-controls-button menu-button"
                            onClick={toggleSidebar}
                        >
                            ☰
                        </button>
                        <label>Bienvenido a la sala <span>#general</span></label>
                    </div>

                    <div className="header-controls">
                        <span className={`connection-status ${isConnected ? 'online' : 'offline'}`}>
                            {isConnected ? (
                                <>🟢 <span>Conectado</span></>
                            ) : (
                                <>🔴 <span>Desconectado</span></>
                            )}
                        </span>

                        {/* Botón para mostrar la lista de usuarios en móvil */}
                        <button
                            onClick={toggleUsers}
                            className={`header-controls-button users-button ${showUsers ? 'active' : ''}`}
                        
                        >
                            👥<span className='total-users'>{onlineUsers.length}</span>
                        </button>
                    </div>
                </header>
                <MessageArea messages={messages} username={username} />
                <MessageInput sendMessage={sendMessage} isConnected={isConnected} />
            </div>

            <UserList users={onlineUsers} isVisible={showUsers} onClose={closePanels} />
        </div>
    );
};

export default ChatContainer;