import React, { useState, useEffect } from 'react';
import { StatsGrid } from './StatsGrid';
import { TrafficChart } from './TrafficChart';
import { SystemHealth } from './SystemHealth';
import { ThreatMap } from './ThreatMap';
import { AlertsPanel } from './AlertsPanel';
import { useNotification } from '../../components/Notification/NotificationContext';

export const MonitoringView: React.FC = () => {
    const [timeRange, setTimeRange] = useState('realtime');
    const { showNotification } = useNotification();

    // Simulate new alerts every 15 seconds (matching v1 script.js line 390)
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                showNotification('⚠️ Phát hiện tấn công DDoS mới!', 'danger');
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [showNotification]);

    return (
        <section className="view-section active" id="monitoring-view">
            <div className="hybrid-layout">
                {/* Left Panel: Monitoring Charts */}
                <div className="monitoring-panel">
                    <div className="panel-header">
                        <h2>Dashboard Giám sát</h2>
                        <div className="time-selector">
                            <button
                                className={`time-btn ${timeRange === 'realtime' ? 'active' : ''}`}
                                onClick={() => setTimeRange('realtime')}
                            >
                                Thời gian thực
                            </button>
                            <button
                                className={`time-btn ${timeRange === '1h' ? 'active' : ''}`}
                                onClick={() => setTimeRange('1h')}
                            >
                                1H
                            </button>
                            <button
                                className={`time-btn ${timeRange === '24h' ? 'active' : ''}`}
                                onClick={() => setTimeRange('24h')}
                            >
                                24H
                            </button>
                        </div>
                    </div>

                    <StatsGrid />
                    <TrafficChart />
                    <SystemHealth />
                    <ThreatMap />
                </div>

                {/* Right Panel: Quick Alerts */}
                <AlertsPanel />
            </div>
        </section>
    );
};
