import React, { useState } from 'react';
import './MessageInput.css'

const MessageInput = ({ sendMessage, isConnected }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = inputMessage.trim();
        if (text && isConnected) {
            sendMessage(text);
            setInputMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-form">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isConnected ? "Escribe un mensaje..." : "Conectando..."}
                disabled={!isConnected}
                maxLength={500}
            />
            <button type="submit" disabled={!isConnected || !inputMessage.trim()}>
                Enviar
            </button>
        </form>
    );
};

export default MessageInput;