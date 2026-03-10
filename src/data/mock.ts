import type { Incident } from '../types';

export const mockIncidents: Incident[] = [
    {
        id: 'INC-2024-001',
        title: 'Tấn công DDoS - SYN Flood',
        priority: 'critical',
        time: '2 phút trước',
        source: '203.162.10.xxx',
        target: ':80, :443',
        aiScore: '98%',
        status: 'detected',
        tags: [{ label: 'DDoS', type: 'danger' }],
        assignee: { name: 'Tự động phát hiện', avatar: 'AI' }
    },
    {
        id: 'INC-2024-002',
        title: 'Tấn công UDP Flood',
        priority: 'high',
        time: '15 phút trước',
        source: '45.142.xxx.xxx',
        target: ':53',
        aiScore: '85%',
        status: 'detected',
        tags: [{ label: 'DDoS', type: 'danger' }],
        assignee: { name: 'Tự động phát hiện', avatar: 'AI' }
    },
    {
        id: 'INC-2024-003',
        title: 'Hoạt động quét cổng',
        priority: 'medium',
        time: '1 giờ trước',
        source: '192.168.1.45',
        type: 'Quét nội bộ',
        aiScore: '72%',
        status: 'detected',
        tags: [{ label: 'Bất thường', type: 'warning' }],
        assignee: { name: 'Tự động phát hiện', avatar: 'AI' }
    },
    {
        id: 'INC-2024-004',
        title: 'Tấn công dò mật khẩu',
        priority: 'critical',
        time: '3 giờ trước',
        source: '91.203.xxx.xxx',
        target: 'SSH :22',
        aiScore: '2.847 (Lần thử)',
        status: 'investigating',
        tags: [{ label: 'Xâm nhập', type: 'danger' }],
        assignee: { name: 'John Doe', avatar: 'JD', color: '#1890FF' }
    },
    {
        id: 'INC-2024-005',
        title: 'Lưu lượng ra bất thường',
        priority: 'high',
        time: '5 giờ trước',
        source: '10.0.5.128',
        target: 'C2 không xác định',
        aiScore: '91%',
        status: 'investigating',
        tags: [{ label: 'Mã độc', type: 'warning' }],
        assignee: { name: 'Sarah Miller', avatar: 'SM', color: '#52C41A' }
    },
    {
        id: 'INC-2024-006',
        title: 'DDoS quy mô lớn - Đa vector',
        priority: 'critical',
        time: '8 giờ trước',
        source: '147 IP',
        target: '4.2 Gbps',
        aiScore: '78% hoàn thành',
        status: 'mitigating',
        progress: 78,
        tags: [{ label: 'DDoS', type: 'danger' }, { label: 'Tự động', type: 'info' }],
        assignee: { name: 'Đội quản trị', avatar: 'AD', color: '#FAAD14' }
    },
    {
        id: 'INC-2024-007',
        title: 'Tấn công HTTP Flood',
        priority: 'high',
        time: '12 giờ trước',
        source: '23 (IP đã chặn)',
        target: '45 phút',
        status: 'resolved',
        tags: [{ label: 'Đã xử lý', type: 'success' }],
        assignee: { name: 'John Doe', avatar: 'JD', color: '#1890FF' }
    },
    {
        id: 'INC-2024-008',
        title: 'Báo động giả - Tăng lưu lượng bình thường',
        priority: 'medium',
        time: '1 ngày trước',
        source: 'Chiến dịch marketing',
        target: 'Đã thêm vào danh sách trắng',
        status: 'resolved',
        tags: [{ label: 'Báo động giả', type: 'info' }],
        assignee: { name: 'Sarah Miller', avatar: 'SM', color: '#52C41A' }
    }
];
