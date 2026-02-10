import React, { useEffect, useState } from 'react';

export const SystemHealth: React.FC = () => {
    const [cpu, setCpu] = useState(45);
    const [ram, setRam] = useState(68);
    const [network, setNetwork] = useState(82);

    useEffect(() => {
        const updateValue = (current: number) => {
            const newVal = Math.max(20, Math.min(95, current + (Math.random() - 0.5) * 10));
            return Math.round(newVal);
        };

        const interval = setInterval(() => {
            setCpu(prev => updateValue(prev));
            setRam(prev => updateValue(prev));
            setNetwork(prev => updateValue(prev));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getGaugeColor = (value: number) => {
        if (value < 60) return { class: 'gauge-fill-success', color: '#52C41A', label: 'Normal' };
        if (value < 80) return { class: 'gauge-fill-warning', color: '#FAAD14', label: 'Elevated' };
        return { class: 'gauge-fill-danger', color: '#FF4D4F', label: 'Critical' };
    };

    const renderGauge = (value: number, title: string) => {
        const { class: colorClass, color, label } = getGaugeColor(value);
        const offset = 251.2 * (1 - value / 100);

        return (
            <div className="health-card">
                <h3>{title}</h3>
                <div className="gauge-container">
                    <svg className="gauge" viewBox="0 0 200 120">
                        <path className="gauge-bg" d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#2A2A3C" strokeWidth="20" />
                        <path
                            className={`gauge-fill ${colorClass}`}
                            d="M20,100 A80,80 0 0,1 180,100"
                            fill="none"
                            stroke={color}
                            strokeWidth="20"
                            strokeDasharray="251.2"
                            strokeDashoffset={offset}
                        />
                        <text x="100" y="85" className="gauge-value">{value}%</text>
                        <text x="100" y="105" className="gauge-label">{label}</text>
                    </svg>
                </div>
            </div>
        );
    };

    return (
        <div className="system-health-grid">
            {renderGauge(cpu, 'CPU Usage')}
            {renderGauge(ram, 'RAM Usage')}
            {renderGauge(network, 'Network Load')}
        </div>
    );
};
