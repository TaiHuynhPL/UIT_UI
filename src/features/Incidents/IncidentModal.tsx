import React, { useState } from 'react';
import type { Incident } from '../../types';
import { useNotification } from '../../components/Notification/NotificationContext';

interface IncidentModalProps {
    incident: Incident;
    onClose: () => void;
    onUpdate: (updated: Incident) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ incident, onClose, onUpdate }) => {
    const priorityLabel = incident.priority === 'critical' ? 'P1' : incident.priority === 'high' ? 'P2' : 'P3';
    const { showNotification } = useNotification();
    const [showLog, setShowLog] = useState(false);

    const statusLabels: Record<string, string> = {
        detected: 'Phát hiện',
        investigating: 'Đang điều tra',
        mitigating: 'Đang xử lý',
        resolved: 'Đã giải quyết',
    };

    const handleBlockIP = () => {
        if (incident.source) {
            showNotification(`IP ${incident.source} đã bị chặn và thêm vào danh sách đen`, 'success');
        } else {
            showNotification('Không có thông tin IP nguồn để chặn', 'warning');
        }
    };

    const handleAssignToMe = () => {
        const updated: Incident = {
            ...incident,
            assignee: { name: 'Admin', avatar: 'AD', color: '#1890FF' },
        };
        onUpdate(updated);
        showNotification(`Sự cố #${incident.id} đã được gán cho bạn`, 'success');
    };

    const handleViewLog = () => {
        setShowLog(!showLog);
    };

    const handleCloseTicket = () => {
        const updated: Incident = {
            ...incident,
            status: 'resolved',
        };
        onUpdate(updated);
        showNotification(`Sự cố #${incident.id} đã được đóng và chuyển sang Đã giải quyết`, 'success');
        onClose();
    };

    const mockLogs = [
        { time: '14:30:01', message: `[ALERT] Phát hiện hoạt động bất thường từ ${incident.source || 'N/A'}` },
        { time: '14:30:02', message: `[SCAN] Đang phân tích traffic pattern...` },
        { time: '14:30:03', message: `[AI] Confidence score: ${incident.aiScore || 'N/A'}` },
        { time: '14:30:05', message: `[RULE] Kiểm tra chính sách firewall hiện tại` },
        { time: '14:30:08', message: `[ACTION] Đề xuất: Block source IP, tạo incident ticket` },
    ];

    return (
        <div className="modal active" id="card-detail-modal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Chi tiết Sự cố</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-card-header">
                        <span className={`card-priority card-priority-${incident.priority}`}>
                            {priorityLabel}
                        </span>
                        <span className="card-id">#{incident.id}</span>
                    </div>
                    <h3 className="modal-card-title">{incident.title}</h3>
                    <div className="modal-details">
                        {incident.source && (
                            <div className="modal-detail-row">
                                <span className="modal-detail-label">Nguồn:</span>
                                <span className="modal-detail-value">{incident.source}</span>
                            </div>
                        )}
                        {incident.target && (
                            <div className="modal-detail-row">
                                <span className="modal-detail-label">Mục tiêu:</span>
                                <span className="modal-detail-value">{incident.target}</span>
                            </div>
                        )}
                        {incident.aiScore && (
                            <div className="modal-detail-row">
                                <span className="modal-detail-label">Điểm AI:</span>
                                <span className="modal-detail-value">{incident.aiScore}</span>
                            </div>
                        )}
                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Người phụ trách:</span>
                            <span className="modal-detail-value">{incident.assignee?.name || 'Chưa gán'}</span>
                        </div>
                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Trạng thái:</span>
                            <span className="modal-detail-value">{statusLabels[incident.status] || incident.status}</span>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button className="btn btn-danger" onClick={handleBlockIP}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1L1 5v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5l-7-4z" />
                            </svg>
                            Chặn IP
                        </button>
                        <button className="btn btn-primary" onClick={handleAssignToMe}>Gán cho tôi</button>
                        <button className="btn btn-secondary" onClick={handleViewLog}>
                            {showLog ? 'Ẩn nhật ký' : 'Xem nhật ký'}
                        </button>
                        <button className="btn btn-secondary" onClick={handleCloseTicket}>Đóng sự cố</button>
                    </div>

                    {showLog && (
                        <div className="modal-log-section">
                            <h4>Nhật ký hệ thống</h4>
                            <div className="log-container">
                                {mockLogs.map((log, idx) => (
                                    <div key={idx} className="log-entry">
                                        <span className="log-time">{log.time}</span>
                                        <span className="log-message">{log.message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="modal-timeline">
                        <h4>Dòng thời gian</h4>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-title">Phát hiện bởi AI</div>
                                <div className="timeline-time">2 phút trước</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-title">Ticket được tạo tự động</div>
                                <div className="timeline-time">2 phút trước</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
