// ==========================================
// SOC Dashboard - Interactive Functionality
// ==========================================

// Global State
const state = {
    currentView: 'monitoring',
    incidents: [],
    draggingCard: null,
    chartData: {
        normal: [],
        attack: []
    }
};

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeKanban();
    initializeTrafficChart();
    initializeQuickActions();
    initializeModal();
    startRealTimeUpdates();
});

// ==========================================
// Navigation
// ==========================================
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const viewName = button.dataset.view;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active view
            viewSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${viewName}-view`).classList.add('active');
            
            state.currentView = viewName;
        });
    });
}

// ==========================================
// Kanban Board - Drag & Drop
// ==========================================
function initializeKanban() {
    const cards = document.querySelectorAll('.incident-card');
    const columns = document.querySelectorAll('.column-content');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                showCardDetails(card);
            }
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    this.classList.add('dragging');
    state.draggingCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove all drag-over classes
    document.querySelectorAll('.column-content').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (e.target === this) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (state.draggingCard) {
        this.appendChild(state.draggingCard);
        updateColumnCounts();
        
        // Show notification
        const newStatus = this.dataset.status;
        showNotification(`Ticket đã được chuyển sang ${newStatus}`, 'success');
    }
    
    return false;
}

function updateColumnCounts() {
    document.querySelectorAll('.column-content').forEach(column => {
        const count = column.querySelectorAll('.incident-card').length;
        const countElement = column.closest('.kanban-column').querySelector('.column-count');
        countElement.textContent = count;
    });
}

// ==========================================
// Card Details Modal
// ==========================================
function showCardDetails(card) {
    const modal = document.getElementById('card-detail-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    const title = card.querySelector('.card-title').textContent;
    const priority = card.querySelector('.card-priority').textContent;
    const id = card.querySelector('.card-id').textContent;
    const details = Array.from(card.querySelectorAll('.detail-item'));
    
    let detailsHTML = '';
    details.forEach(detail => {
        const label = detail.querySelector('.label').textContent;
        const value = detail.querySelector('.value').textContent;
        detailsHTML += `
            <div class="modal-detail-row">
                <span class="modal-detail-label">${label}</span>
                <span class="modal-detail-value">${value}</span>
            </div>
        `;
    });
    
    modalBody.innerHTML = `
        <div class="modal-card-header">
            <span class="card-priority ${card.querySelector('.card-priority').className}">${priority}</span>
            <span class="card-id">${id}</span>
        </div>
        <h3 class="modal-card-title">${title}</h3>
        <div class="modal-details">
            ${detailsHTML}
        </div>
        <div class="modal-actions">
            <button class="btn btn-danger">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1L1 5v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5l-7-4z"/>
                </svg>
                Block IP
            </button>
            <button class="btn btn-primary">Gán cho tôi</button>
            <button class="btn btn-secondary">Xem Log</button>
            <button class="btn btn-secondary">Đóng Ticket</button>
        </div>
        <div class="modal-timeline">
            <h4>Timeline</h4>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-title">Phát hiện bởi AI</div>
                    <div class="timeline-time">2 phút trước</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-title">Ticket được tạo tự động</div>
                    <div class="timeline-time">2 phút trước</div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function initializeModal() {
    const modal = document.getElementById('card-detail-modal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// ==========================================
// Traffic Chart
// ==========================================
function initializeTrafficChart() {
    const canvas = document.getElementById('trafficCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Generate initial data
    generateChartData();
    
    // Draw chart
    drawChart(ctx, canvas.width, canvas.height);
    
    // Update chart periodically
    setInterval(() => {
        updateChartData();
        drawChart(ctx, canvas.width, canvas.height);
    }, 2000);
}

function generateChartData() {
    const points = 50;
    state.chartData.normal = [];
    state.chartData.attack = [];
    
    for (let i = 0; i < points; i++) {
        const baseValue = 0.3 + Math.sin(i * 0.1) * 0.2 + Math.random() * 0.1;
        state.chartData.normal.push(baseValue);
        
        const attackValue = i > 30 ? (baseValue + Math.random() * 0.4) : 0;
        state.chartData.attack.push(attackValue);
    }
}

function updateChartData() {
    // Shift data left
    state.chartData.normal.shift();
    state.chartData.attack.shift();
    
    // Add new data point
    const baseValue = 0.3 + Math.sin(state.chartData.normal.length * 0.1) * 0.2 + Math.random() * 0.1;
    state.chartData.normal.push(baseValue);
    
    const hasAttack = Math.random() > 0.7;
    const attackValue = hasAttack ? (baseValue + Math.random() * 0.4) : 0;
    state.chartData.attack.push(attackValue);
}

function drawChart(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw grid
    ctx.strokeStyle = '#2A2A3C';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw normal traffic line
    drawLine(ctx, state.chartData.normal, '#52C41A', padding, chartWidth, chartHeight);
    
    // Draw attack traffic line
    drawLine(ctx, state.chartData.attack, '#FF4D4F', padding, chartWidth, chartHeight);
    
    // Draw axes labels
    ctx.fillStyle = '#6E6E80';
    ctx.font = '12px Inter';
    ctx.fillText('0', 10, height - padding + 5);
    ctx.fillText('Time', width / 2 - 15, height - 10);
    ctx.fillText('Traffic', 10, 20);
}

function drawLine(ctx, data, color, padding, chartWidth, chartHeight) {
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
}

// ==========================================
// Quick Actions
// ==========================================
function initializeQuickActions() {
    // Block IP buttons
    document.querySelectorAll('.btn-danger').forEach(btn => {
        if (btn.textContent.includes('Block IP')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const alertCard = btn.closest('.alert-card');
                const ip = alertCard.querySelector('.detail-value.monospace').textContent;
                blockIP(ip);
            });
        }
    });
    
    // Create Ticket buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('Tạo Ticket')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                createTicket();
            });
        }
    });
}

function blockIP(ip) {
    showNotification(`IP ${ip} đã được chặn và thêm vào blacklist`, 'success');
    
    // Simulate adding to blacklist table
    setTimeout(() => {
        // In real app, this would update the backend
        console.log(`Blocked IP: ${ip}`);
    }, 500);
}

function createTicket() {
    showNotification('Ticket mới đã được tạo trong Kanban board', 'info');
}

// ==========================================
// Real-time Updates
// ==========================================
function startRealTimeUpdates() {
    // Update system health gauges
    setInterval(updateSystemHealth, 3000);
    
    // Simulate new alerts
    setInterval(simulateNewAlert, 15000);
}

function updateSystemHealth() {
    // Randomly update gauge values
    const gauges = document.querySelectorAll('.gauge-value');
    gauges.forEach(gauge => {
        const currentValue = parseInt(gauge.textContent);
        const newValue = Math.max(20, Math.min(95, currentValue + (Math.random() - 0.5) * 10));
        gauge.textContent = Math.round(newValue) + '%';
        
        // Update gauge fill
        const fill = gauge.parentElement.querySelector('.gauge-fill');
        const offset = 251.2 * (1 - newValue / 100);
        fill.setAttribute('stroke-dashoffset', offset);
        
        // Update color based on value
        fill.classList.remove('gauge-fill-success', 'gauge-fill-warning', 'gauge-fill-danger');
        if (newValue < 60) {
            fill.classList.add('gauge-fill-success');
            fill.setAttribute('stroke', '#52C41A');
        } else if (newValue < 80) {
            fill.classList.add('gauge-fill-warning');
            fill.setAttribute('stroke', '#FAAD14');
        } else {
            fill.classList.add('gauge-fill-danger');
            fill.setAttribute('stroke', '#FF4D4F');
        }
    });
}

function simulateNewAlert() {
    if (Math.random() > 0.7) {
        showNotification('⚠️ Phát hiện tấn công DDoS mới!', 'danger');
        
        // Update attack count
        const attackStat = document.querySelector('.stat-value-danger');
        if (attackStat) {
            const current = parseInt(attackStat.textContent);
            attackStat.textContent = current + 1;
        }
    }
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;
    
    // Add styles dynamically if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: var(--spacing-md);
                min-width: 300px;
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--spacing-md);
                animation: slideInRight 0.3s ease;
                z-index: 10000;
                border-left: 4px solid;
            }
            
            .notification-success { border-left-color: var(--color-success); }
            .notification-danger { border-left-color: var(--color-danger); }
            .notification-warning { border-left-color: var(--color-warning); }
            .notification-info { border-left-color: var(--color-info); }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            
            .notification-icon {
                font-size: 20px;
            }
            
            .notification-message {
                font-size: 14px;
                color: var(--text-primary);
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--text-secondary);
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            .modal-detail-row {
                display: flex;
                justify-content: space-between;
                padding: 12px;
                border-bottom: 1px solid var(--border-primary);
            }
            
            .modal-detail-label {
                color: var(--text-secondary);
                font-weight: 500;
            }
            
            .modal-detail-value {
                font-family: var(--font-mono);
                color: var(--text-primary);
            }
            
            .modal-card-header {
                display: flex;
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-md);
            }
            
            .modal-card-title {
                font-size: 20px;
                margin-bottom: var(--spacing-lg);
            }
            
            .modal-details {
                background: var(--bg-tertiary);
                border-radius: var(--radius-md);
                margin-bottom: var(--spacing-lg);
            }
            
            .modal-actions {
                display: flex;
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-lg);
                flex-wrap: wrap;
            }
            
            .modal-timeline {
                margin-top: var(--spacing-xl);
            }
            
            .modal-timeline h4 {
                font-size: 16px;
                margin-bottom: var(--spacing-md);
            }
            
            .timeline-item {
                display: flex;
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-md);
                position: relative;
            }
            
            .timeline-item:not(:last-child)::before {
                content: '';
                position: absolute;
                left: 7px;
                top: 20px;
                width: 2px;
                height: calc(100% + 8px);
                background: var(--border-primary);
            }
            
            .timeline-dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--color-info);
                border: 3px solid var(--bg-secondary);
                flex-shrink: 0;
            }
            
            .timeline-content {
                flex: 1;
            }
            
            .timeline-title {
                font-weight: 500;
                margin-bottom: 4px;
            }
            
            .timeline-time {
                font-size: 12px;
                color: var(--text-tertiary);
            }
            
            .drag-over {
                background: var(--bg-hover) !important;
                border: 2px dashed var(--color-info);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        danger: '⚠',
        warning: '⚡',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// ==========================================
// Window Resize Handler
// ==========================================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('trafficCanvas');
    if (canvas) {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        drawChart(ctx, canvas.width, canvas.height);
    }
});

// ==========================================
// Export for debugging
// ==========================================
window.SOCDashboard = {
    state,
    showNotification,
    blockIP,
    createTicket
};
