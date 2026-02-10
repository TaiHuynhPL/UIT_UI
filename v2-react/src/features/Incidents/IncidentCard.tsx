import React from 'react';
import type { Incident } from '../../types';

interface IncidentCardProps {
    incident: Incident;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onClick: (incident: Incident) => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onDragStart, onDragEnd, onClick }) => {
    return (
        <div
            className="incident-card"
            draggable
            onDragStart={(e) => onDragStart(e, incident.id)}
            onDragEnd={onDragEnd}
            onClick={(e) => {
                if (!(e.target as HTMLElement).closest('button')) {
                    onClick(incident);
                }
            }}
        >
            <div className={`card-priority card-priority-${incident.priority}`}>
                {incident.priority === 'critical' ? 'P1' : incident.priority === 'high' ? 'P2' : 'P3'}
            </div>
            <div className="card-title">{incident.title}</div>
            <div className="card-meta">
                <span className="card-id">#{incident.id}</span>
                <span className="card-time">{incident.time}</span>
            </div>
            <div className="card-details">
                {incident.source && (
                    <div className="detail-item">
                        <span className="label">Source:</span>
                        <span className="value monospace">{incident.source}</span>
                    </div>
                )}
                {incident.target && (
                    <div className="detail-item">
                        <span className="label">Target:</span>
                        <span className="value monospace">{incident.target}</span>
                    </div>
                )}
                {incident.aiScore && (
                    <div className="detail-item">
                        <span className="label">AI Score:</span>
                        <span className="value">{incident.aiScore}</span>
                    </div>
                )}
            </div>
            {incident.progress !== undefined && (
                <div className="card-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${incident.progress}%` }}></div>
                    </div>
                </div>
            )}
            <div className="card-footer">
                <div className="card-assignee">
                    <div
                        className="avatar avatar-sm"
                        style={{ background: incident.assignee?.color }}
                    >
                        {incident.assignee?.avatar || 'AI'}
                    </div>
                    <span>{incident.assignee?.name}</span>
                </div>
                <div className="card-tags">
                    {incident.tags.map((tag, idx) => (
                        <span key={idx} className={`tag tag-${tag.type}`}>
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
