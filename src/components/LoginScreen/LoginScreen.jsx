import React, { useState } from 'react';
import './LoginScreen.css';

export const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanUsername = username.trim().substring(0, 25);
        
        if (cleanUsername) {
            setIsLoading(true);
            
            // SimulO un pequeño delay para la animación de carga
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onLogin(cleanUsername);
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>

                <h1>Bienvenido al Chat</h1>
                <p className="login-subtitle">
                    Únete a la conversación y conecta con otros en tiempo real
                </p>

                <div className="login-input-group">
                    <input
                        type="text"
                        placeholder="Escribe tu nickname"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        maxLength={25}
                        disabled={isLoading}
                    />
                    <div className="login-input-icon">
                        👤
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={`login-button ${isLoading ? 'loading' : ''}`}
                    disabled={!username.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="button-spinner"></span>
                            Conectando...
                        </>
                    ) : (
                        '🎉 Acceder al Chat'
                    )}
                </button>

                <div className="login-help">
                    <p>Usa un nombre único para identificarte en el chat</p>
                </div>
            </form>
        </div>
    );
};