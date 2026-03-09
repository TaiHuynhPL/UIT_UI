import React, { useState } from 'react';
import type { Incident } from '../../types';

interface CreateIncidentModalProps {
    onClose: () => void;
    onCreate: (incident: Incident) => void;
}

export const CreateIncidentModal: React.FC<CreateIncidentModalProps> = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Incident['priority']>('medium');
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const [tagType, setTagType] = useState<'danger' | 'warning' | 'info'>('warning');

    const tagLabels: Record<string, string> = {
        danger: 'DDoS',
        warning: 'Anomaly',
        info: 'Intrusion',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newIncident: Incident = {
            id: `INC-${Date.now().toString().slice(-7)}`,
            title: title.trim(),
            priority,
            time: 'Vừa xong',
            source: source.trim() || undefined,
            target: target.trim() || undefined,
            status: 'detected',
            tags: [{ label: tagLabels[tagType], type: tagType }],
            assignee: { name: 'Admin', avatar: 'AD', color: '#1890FF' },
        };

        onCreate(newIncident);
    };

    return (
        <div className="modal active" id="create-incident-modal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Tạo sự cố mới</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="create-incident-form">
                        <div className="form-group">
                            <label className="form-label">Tiêu đề sự cố *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="VD: DDoS Attack - SYN Flood"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Mức độ ưu tiên</label>
                            <select
                                className="form-select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Incident['priority'])}
                            >
                                <option value="critical">P1 - Critical</option>
                                <option value="high">P2 - High</option>
                                <option value="medium">P3 - Medium</option>
                                <option value="low">P4 - Low</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Source IP</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="VD: 203.162.10.xxx"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Target</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="VD: :80, :443"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Loại sự cố</label>
                            <select
                                className="form-select"
                                value={tagType}
                                onChange={(e) => setTagType(e.target.value as 'danger' | 'warning' | 'info')}
                            >
                                <option value="danger">DDoS</option>
                                <option value="warning">Anomaly</option>
                                <option value="info">Intrusion</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                            <button type="submit" className="btn btn-primary">Tạo sự cố</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
