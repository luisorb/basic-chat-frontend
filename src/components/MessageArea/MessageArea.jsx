import React, { useRef, useEffect } from 'react';
import './MessageArea.css'

const MessageArea = ({ messages, username }) => {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const scrollToBottomRef = useRef(null);

    // Función para hacer scroll al final
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }
    };

    // Función para hacer scroll instantáneo al final (sin animación)
    const scrollToBottomInstant = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'instant',
                block: 'end'
            });
        }
    };

    // Efecto para scroll automático al cargar mensajes
    useEffect(() => {
        scrollToBottomInstant();
    }, [messages]);

    // Efecto para scroll automático cuando el usuario accede
    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottomInstant();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;

            if (scrollToBottomRef.current) {
                if (isScrolledUp) {
                    scrollToBottomRef.current.classList.add('visible');
                } else {
                    scrollToBottomRef.current.classList.remove('visible');
                }
            }
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return new Date().toLocaleTimeString();

        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div className="message-area">
            <div
                ref={messagesContainerRef}
                className="messages-container"
                onScroll={handleScroll}
            >
                {messages.map((message, index) => (
                    <div
                        key={message.id || index}
                        className={`message-bubble ${message.sender === username ? 'mine' : message.sender === 'system' ? 'system' : 'other'}`}
                    >
                        {message.sender !== 'system' && message.sender !== username && (
                            <span className="message-sender">{message.sender}</span>
                        )}
                        <div className="message-content">{message.text}</div>
                        <span className="message-timestamp">
                            📅 {formatTimestamp(message.timestamp)|| new Date().toLocaleTimeString()}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <button
                ref={scrollToBottomRef}
                className="scroll-to-bottom"
                onClick={scrollToBottom}
                title="Ir al final"
            >
                ↓
            </button>
        </div>
    );
};

export default MessageArea;