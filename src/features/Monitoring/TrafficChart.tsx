import React, { useEffect, useRef } from 'react';

interface ChartData {
    normal: number[];
    attack: number[];
}

export const TrafficChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dataRef = useRef<ChartData>({
        normal: [],
        attack: []
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const container = canvas.parentElement;
        if (!container) return;

        // Initialize Data
        const generateChartData = () => {
            const points = 50;
            dataRef.current.normal = [];
            dataRef.current.attack = [];

            for (let i = 0; i < points; i++) {
                const baseValue = 0.3 + Math.sin(i * 0.1) * 0.2 + Math.random() * 0.1;
                dataRef.current.normal.push(baseValue);

                const attackValue = i > 30 ? (baseValue + Math.random() * 0.4) : 0;
                dataRef.current.attack.push(attackValue);
            }
        };

        const updateChartData = () => {
            // Shift data left
            dataRef.current.normal.shift();
            dataRef.current.attack.shift();

            // Add new data point
            const baseValue = 0.3 + Math.sin(dataRef.current.normal.length * 0.1) * 0.2 + Math.random() * 0.1;
            dataRef.current.normal.push(baseValue);

            const hasAttack = Math.random() > 0.7;
            const attackValue = hasAttack ? (baseValue + Math.random() * 0.4) : 0;
            dataRef.current.attack.push(attackValue);
        };

        const drawLine = (ctx: CanvasRenderingContext2D, data: number[], color: string, padding: number, chartWidth: number, chartHeight: number) => {
            if (data.length < 2) return;

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();

            const stepX = chartWidth / (data.length - 1);

            data.forEach((value, index) => {
                const x = padding + stepX * index;
                const y = padding + chartHeight - (value * chartHeight);

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();

            // Fill area under line
            ctx.lineTo(padding + chartWidth, padding + chartHeight);
            ctx.lineTo(padding, padding + chartHeight);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
            gradient.addColorStop(0, color + '40');
            gradient.addColorStop(1, color + '00');
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        const drawChart = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const padding = 40;
            const chartWidth = canvas.width - padding * 2;
            const chartHeight = canvas.height - padding * 2;

            // Draw grid
            ctx.strokeStyle = '#2A2A3C';
            ctx.lineWidth = 1;

            for (let i = 0; i <= 5; i++) {
                const y = padding + (chartHeight / 5) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(canvas.width - padding, y);
                ctx.stroke();
            }

            // Draw normal traffic line
            drawLine(ctx, dataRef.current.normal, '#52C41A', padding, chartWidth, chartHeight);

            // Draw attack traffic line
            drawLine(ctx, dataRef.current.attack, '#FF4D4F', padding, chartWidth, chartHeight);

            // Draw axes labels
            ctx.fillStyle = '#6E6E80';
            ctx.font = '12px Inter';
            ctx.fillText('0', 10, canvas.height - padding + 5);
            ctx.fillText('Time', canvas.width / 2 - 15, canvas.height - 10);
            ctx.fillText('Traffic', 10, 20);
        };

        // Resize handler
        const handleResize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            drawChart();
        };

        // Init
        generateChartData();
        handleResize();
        window.addEventListener('resize', handleResize);

        // Interval for data update
        const intervalId = setInterval(() => {
            updateChartData();
            drawChart();
        }, 2000); // Changed to 2000ms to match script.js line 239

        // Initial draw
        drawChart();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3>Lưu lượng mạng</h3>
                <div className="chart-legend">
                    <span className="legend-item">
                        <span className="legend-color" style={{ background: '#52C41A' }}></span>
                        Lưu lượng bình thường
                    </span>
                    <span className="legend-item">
                        <span className="legend-color" style={{ background: '#FF4D4F' }}></span>
                        Tấn công phát hiện
                    </span>
                </div>
            </div>
            <div className="chart-canvas" id="traffic-chart">
                <canvas ref={canvasRef} id="trafficCanvas"></canvas>
            </div>
        </div>
    );
};
