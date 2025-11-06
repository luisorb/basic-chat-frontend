import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import ChatContainer from './components/ChatContainer/ChatContainer';
import useWebSocket from './hooks/useWebSocket';
import './index.css';

function App() {
    const [username, setUsername] = useState(null);
    const { messages, onlineUsers, isConnected, sendMessage } = useWebSocket(username);

    const handleLogin = (nick) => {
        setUsername(nick);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (username) {
                event.preventDefault();
                event.returnValue = "¿Estás seguro de que quieres abandonar el chat?";
                return "¿Estás seguro de que quieres abandonar el chat?";
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [username]);

    return (
        <div className="app-main">
            {!username ? (
                <LoginScreen onLogin={handleLogin} />
            ) : (
                <ChatContainer
                    messages={messages}
                    onlineUsers={onlineUsers}
                    sendMessage={sendMessage}
                    isConnected={isConnected}
                    username={username}
                />
            )}
        </div>
    );
}

export default App;