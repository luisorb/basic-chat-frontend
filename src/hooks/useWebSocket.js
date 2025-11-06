import { useState, useEffect, useRef, useCallback } from 'react';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:4000';

const useWebSocket = (username) => {
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const retryTimeoutRef = useRef(null);

    const handleMessage = useCallback((event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
            case 'messageHistory':
                setMessages(data.messages.map(msg => ({ 
                    ...msg,
                    sender: msg.sender === 'Sistema' ? 'system' : msg.sender
                }))); 
                break;
            case 'newMessage':
                // Mensajes normales de usuarios
                setMessages(prev => [...prev, data]);
                break;
            case 'systemMessage':
                // Mensajes del sistema
                setMessages(prev => [...prev, { 
                    ...data,
                    sender: 'system'
                }]);
                break;
            case 'onlineUsers':
                setOnlineUsers(data.users.map(u => u.name));
                break;
            default:
                console.log('Tipo de mensaje desconocido:', data);
        }
    }, []);

    useEffect(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            return;
        }

        const connect = () => {
            clearTimeout(retryTimeoutRef.current);
            console.log('Intentando conectar WebSocket...');
            
            const ws = new WebSocket(`${WEBSOCKET_URL}?username=${encodeURIComponent(username)}`);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('✅ Conexión WS establecida');
                setIsConnected(true);
            };

            ws.onmessage = handleMessage;

            ws.onclose = () => {
                console.log('❌ Conexión WS cerrada');
                setIsConnected(false);
                retryTimeoutRef.current = setTimeout(connect, 3000); 
            };

            ws.onerror = (error) => {
                console.error('⚠️ Error en WebSocket:', error);
                ws.close();
            };
        };

        if (username) {
            connect();
        }

        return () => {
            clearTimeout(retryTimeoutRef.current);
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
                setIsConnected(false);
            }
        };
    }, [username, handleMessage]);

    const sendMessage = useCallback((messageText) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const payload = {
                type: 'sendMessage',
                message: messageText
            };
            wsRef.current.send(JSON.stringify(payload));
        } else {
            console.error('No se puede enviar. Conexión WS no abierta.');
        }
    }, []);

    return { 
        messages, 
        onlineUsers, 
        isConnected, 
        sendMessage 
    };
};

export default useWebSocket;