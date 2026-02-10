import React from 'react';

export const StatsGrid: React.FC = () => {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon stat-icon-danger">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-label">Tấn công đang diễn ra</div>
                    <div className="stat-value stat-value-danger">3</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon stat-icon-warning">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-label">Cảnh báo cao</div>
                    <div className="stat-value stat-value-warning">12</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon stat-icon-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-label">Lưu lượng trung bình</div>
                    <div className="stat-value">1.2 Gbps</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon stat-icon-success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-label">Đã xử lý hôm nay</div>
                    <div className="stat-value stat-value-success">47</div>
                </div>
            </div>
        </div>
    );
};
