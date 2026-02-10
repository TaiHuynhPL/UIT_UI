import type { Incident } from '../types';

export const mockIncidents: Incident[] = [
    {
        id: 'INC-2024-001',
        title: 'DDoS Attack - SYN Flood',
        priority: 'critical',
        time: '2m ago',
        source: '203.162.10.xxx',
        target: ':80, :443',
        aiScore: '98%',
        status: 'detected',
        tags: [{ label: 'DDoS', type: 'danger' }],
        assignee: { name: 'Auto-detected', avatar: 'AI' }
    },
    {
        id: 'INC-2024-002',
        title: 'UDP Flood Attack',
        priority: 'high',
        time: '15m ago',
        source: '45.142.xxx.xxx',
        target: ':53',
        aiScore: '85%',
        status: 'detected',
        tags: [{ label: 'DDoS', type: 'danger' }],
        assignee: { name: 'Auto-detected', avatar: 'AI' }
    },
    {
        id: 'INC-2024-003',
        title: 'Port Scanning Activity',
        priority: 'medium',
        time: '1h ago',
        source: '192.168.1.45',
        type: 'Internal scan',
        aiScore: '72%',
        status: 'detected',
        tags: [{ label: 'Anomaly', type: 'warning' }],
        assignee: { name: 'Auto-detected', avatar: 'AI' }
    },
    {
        id: 'INC-2024-004',
        title: 'Brute Force Login Attempts',
        priority: 'critical',
        time: '3h ago',
        source: '91.203.xxx.xxx',
        target: 'SSH :22',
        aiScore: '2,847 (Attempts)', // Reusing field for generic value match
        status: 'investigating',
        tags: [{ label: 'Intrusion', type: 'danger' }],
        assignee: { name: 'John Doe', avatar: 'JD', color: '#1890FF' }
    },
    {
        id: 'INC-2024-005',
        title: 'Suspicious Outbound Traffic',
        priority: 'high',
        time: '5h ago',
        source: '10.0.5.128',
        target: 'Unknown C2',
        aiScore: '91%',
        status: 'investigating',
        tags: [{ label: 'Malware', type: 'warning' }],
        assignee: { name: 'Sarah Miller', avatar: 'SM', color: '#52C41A' }
    },
    {
        id: 'INC-2024-006',
        title: 'Large Scale DDoS - Multi-vector',
        priority: 'critical',
        time: '8h ago',
        source: '147 IPs', // Mapping 'source' to 'Sources'
        target: '4.2 Gbps', // Mapping 'target' to 'Bandwidth'
        aiScore: '78% complete', // Mapping 'aiScore' to 'Mitigation'
        status: 'mitigating',
        progress: 78,
        tags: [{ label: 'DDoS', type: 'danger' }, { label: 'Automated', type: 'info' }],
        assignee: { name: 'Admin Team', avatar: 'AD', color: '#FAAD14' }
    },
    // Resolved examples (truncated for brevity but structure is same)
    {
        id: 'INC-2024-007',
        title: 'HTTP Flood Attack',
        priority: 'high',
        time: '12h ago',
        source: '23 (Blocked IPs)',
        target: '45 minutes',
        status: 'resolved',
        tags: [{ label: 'Resolved', type: 'success' }],
        assignee: { name: 'John Doe', avatar: 'JD', color: '#1890FF' }
    },
    {
        id: 'INC-2024-008',
        title: 'False Positive - Normal Traffic Spike',
        priority: 'medium',
        time: '1d ago',
        source: 'Marketing campaign',
        target: 'Whitelist added',
        status: 'resolved',
        tags: [{ label: 'False Positive', type: 'info' }],
        assignee: { name: 'Sarah Miller', avatar: 'SM', color: '#52C41A' }
    }
];
