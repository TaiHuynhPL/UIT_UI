import React from 'react';
import { useNotification } from '../../components/Notification/NotificationContext';

export const AlertsPanel: React.FC = () => {
    const { showNotification } = useNotification();

    const handleBlockIP = (ip: string) => {
        showNotification(`IP ${ip} đã được chặn và thêm vào blacklist`, 'success');
    };

    const handleCreateTicket = () => {
        showNotification('Ticket mới đã được tạo trong Kanban board', 'info');
    };

    return (
        <div className="alerts-panel">
            <div className="panel-header">
                <h2>Cảnh báo mới nhất</h2>
                <button className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3v14M3 10h14" />
                    </svg>
                </button>
            </div>
            <div className="alerts-list">
                <div className="alert-card alert-critical">
                    <div className="alert-header">
                        <span className="alert-priority">P1</span>
                        <span className="alert-type">SYN Flood</span>
                        <span className="alert-time">2 phút trước</span>
                    </div>
                    <div className="alert-title">Phát hiện tấn công DDoS từ nhiều nguồn</div>
                    <div className="alert-details">
                        <div className="detail-row">
                            <span className="detail-label">Source IP:</span>
                            <span className="detail-value monospace">203.162.10.xxx</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Target Port:</span>
                            <span className="detail-value monospace">80, 443</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">AI Confidence:</span>
                            <span className="detail-value">98%</span>
                        </div>
                    </div>
                    <div className="alert-actions">
                        <button className="btn btn-danger btn-sm" onClick={() => handleBlockIP('203.162.10.xxx')}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1L1 5v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5l-7-4z" />
                            </svg>
                            Block IP
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCreateTicket}>Tạo Ticket</button>
                    </div>
                </div>

                <div className="alert-card alert-high">
                    <div className="alert-header">
                        <span className="alert-priority">P2</span>
                        <span className="alert-type">UDP Flood</span>
                        <span className="alert-time">15 phút trước</span>
                    </div>
                    <div className="alert-title">Tăng đột biến UDP traffic</div>
                    <div className="alert-details">
                        <div className="detail-row">
                            <span className="detail-label">Source IP:</span>
                            <span className="detail-value monospace">45.142.xxx.xxx</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Target Port:</span>
                            <span className="detail-value monospace">53</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">AI Confidence:</span>
                            <span className="detail-value">85%</span>
                        </div>
                    </div>
                    <div className="alert-actions">
                        <button className="btn btn-danger btn-sm" onClick={() => handleBlockIP('45.142.xxx.xxx')}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1L1 5v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5l-7-4z" />
                            </svg>
                            Block IP
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCreateTicket}>Tạo Ticket</button>
                    </div>
                </div>

                <div className="alert-card alert-medium">
                    <div className="alert-header">
                        <span className="alert-priority">P3</span>
                        <span className="alert-type">Anomaly</span>
                        <span className="alert-time">1 giờ trước</span>
                    </div>
                    <div className="alert-title">Hành vi bất thường từ internal host</div>
                    <div className="alert-details">
                        <div className="detail-row">
                            <span className="detail-label">Source IP:</span>
                            <span className="detail-value monospace">192.168.1.45</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Behavior:</span>
                            <span className="detail-value">Port scanning</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">AI Confidence:</span>
                            <span className="detail-value">72%</span>
                        </div>
                    </div>
                    <div className="alert-actions">
                        <button className="btn btn-secondary btn-sm">Điều tra</button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCreateTicket}>Tạo Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
