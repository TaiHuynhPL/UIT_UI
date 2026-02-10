import React, { createContext, useContext, useState, useCallback } from 'react';

type NotificationType = 'success' | 'danger' | 'warning' | 'info';

interface Notification {
    id: number;
    message: string;
    type: NotificationType;
    closing?: boolean;
}

interface NotificationContextType {
    showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType>({
    showNotification: () => { },
});

export const useNotification = () => useContext(NotificationContext);

let nextId = 0;

const getNotificationIcon = (type: NotificationType) => {
    const icons: Record<NotificationType, string> = {
        success: '✓',
        danger: '⚠',
        warning: '⚡',
        info: 'ℹ',
    };
    return icons[type] || icons.info;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const closeNotification = useCallback((id: number) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, closing: true } : n)
        );
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
    }, []);

    const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
        const id = nextId++;
        setNotifications([{ id, message, type }]);

        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(id);
        }, 5000);
    }, [closeNotification]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className={`notification notification-${notification.type}`}
                    style={{
                        animation: notification.closing
                            ? 'slideOutRight 0.3s ease'
                            : 'slideInRight 0.3s ease',
                    }}
                >
                    <div className="notification-content">
                        <span className="notification-icon">
                            {getNotificationIcon(notification.type)}
                        </span>
                        <span className="notification-message">{notification.message}</span>
                    </div>
                    <button
                        className="notification-close"
                        onClick={() => closeNotification(notification.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </NotificationContext.Provider>
    );
};
