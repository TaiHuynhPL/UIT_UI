import React from 'react';
import type { Incident } from '../../types';

interface IncidentModalProps {
    incident: Incident;
    onClose: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ incident, onClose }) => {
    const priorityLabel = incident.priority === 'critical' ? 'P1' : incident.priority === 'high' ? 'P2' : 'P3';

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
                                <span className="modal-detail-label">Source:</span>
                                <span className="modal-detail-value">{incident.source}</span>
                            </div>
                        )}
                        {incident.target && (
                            <div className="modal-detail-row">
                                <span className="modal-detail-label">Target:</span>
                                <span className="modal-detail-value">{incident.target}</span>
                            </div>
                        )}
                        {incident.aiScore && (
                            <div className="modal-detail-row">
                                <span className="modal-detail-label">AI Score:</span>
                                <span className="modal-detail-value">{incident.aiScore}</span>
                            </div>
                        )}
                    </div>
                    <div className="modal-actions">
                        <button className="btn btn-danger">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1L1 5v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5l-7-4z" />
                            </svg>
                            Block IP
                        </button>
                        <button className="btn btn-primary">Gán cho tôi</button>
                        <button className="btn btn-secondary">Xem Log</button>
                        <button className="btn btn-secondary">Đóng Ticket</button>
                    </div>
                    <div className="modal-timeline">
                        <h4>Timeline</h4>
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
