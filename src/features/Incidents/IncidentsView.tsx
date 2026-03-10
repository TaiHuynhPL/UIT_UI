import React, { useState } from 'react';
import type { Incident } from '../../types';
import { mockIncidents } from '../../data/mock';
import { IncidentCard } from './IncidentCard';
import { IncidentModal } from './IncidentModal';
import { CreateIncidentModal } from './CreateIncidentModal';
import { useNotification } from '../../components/Notification/NotificationContext';

export const IncidentsView: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { showNotification } = useNotification();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        e.dataTransfer.setData('incidentId', id);
        e.dataTransfer.effectAllowed = 'move';
        // Add dragging class for style
        (e.target as HTMLElement).classList.add('dragging');
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLElement).classList.remove('dragging');
        // Clean up drag-over classes
        document.querySelectorAll('.column-content').forEach(col => {
            col.classList.remove('drag-over');
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Incident['status']) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const id = e.dataTransfer.getData('incidentId');

        setIncidents(prev => prev.map(inc =>
            inc.id === id ? { ...inc, status } : inc
        ));

        const statusLabels: Record<string, string> = {
            detected: 'Phát hiện',
            investigating: 'Đang điều tra',
            mitigating: 'Đang xử lý',
            resolved: 'Đã giải quyết',
        };
        showNotification(`Sự cố đã được chuyển sang ${statusLabels[status] || status}`, 'success');
    };

    const handleCreateIncident = (newIncident: Incident) => {
        setIncidents(prev => [newIncident, ...prev]);
        setShowCreateModal(false);
        showNotification(`Sự cố mới "${newIncident.title}" đã được tạo`, 'success');
    };

    const handleUpdateIncident = (updated: Incident) => {
        setIncidents(prev => prev.map(inc =>
            inc.id === updated.id ? updated : inc
        ));
        // Update the selected incident in the modal as well
        setSelectedIncident(updated);
    };

    const filterIncidents = (status: Incident['status']) => {
        return incidents.filter(inc =>
            inc.status === status &&
            inc.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const renderColumn = (title: string, status: Incident['status'], icon: React.ReactNode, count: number, className: string) => (
        <div className="kanban-column">
            <div className={`column-header ${className}`}>
                <div className="column-title">
                    {icon}
                    {title}
                </div>
                <span className="column-count">{count}</span>
            </div>
            <div
                className="column-content"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, status)}
            >
                {filterIncidents(status).map(incident => (
                    <IncidentCard
                        key={incident.id}
                        incident={incident}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onClick={(inc) => setSelectedIncident(inc)}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <section className="view-section active" id="incidents-view">
            <div className="section-header">
                <h2>Trung tâm Quản lý Sự cố</h2>
                <div className="section-actions">
                    <div className="search-box">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" />
                            <path d="M12 12l6 6" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sự cố..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3v14M3 10h14" />
                        </svg>
                        Tạo sự cố mới
                    </button>
                </div>
            </div>

            <div className="kanban-board">
                {renderColumn('Phát hiện', 'detected', (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" fill="none" />
                        <path d="M10 6v4l3 3" />
                    </svg>
                ), filterIncidents('detected').length, 'column-detected')}

                {renderColumn('Đang điều tra', 'investigating', (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" />
                        <path d="M12 12l6 6" />
                    </svg>
                ), filterIncidents('investigating').length, 'column-investigating')}

                {renderColumn('Đang xử lý', 'mitigating', (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2L2 6v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V6l-7-4z" />
                    </svg>
                ), filterIncidents('mitigating').length, 'column-mitigating')}

                {renderColumn('Đã giải quyết', 'resolved', (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 13L3 9l1.4-1.4L7 10.2l8.6-8.6L17 3l-10 10z" />
                    </svg>
                ), filterIncidents('resolved').length, 'column-resolved')}
            </div>

            {selectedIncident && (
                <IncidentModal
                    incident={selectedIncident}
                    onClose={() => setSelectedIncident(null)}
                    onUpdate={handleUpdateIncident}
                />
            )}

            {showCreateModal && (
                <CreateIncidentModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateIncident}
                />
            )}
        </section>
    );
};
