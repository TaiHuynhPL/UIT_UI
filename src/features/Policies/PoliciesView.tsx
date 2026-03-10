import React, { useState } from 'react';
import type { FirewallRule, BlacklistEntry, WhitelistEntry } from '../../types';
import { useNotification } from '../../components/Notification/NotificationContext';

const initialFirewallRules: FirewallRule[] = [
    { id: 'FW-001', name: 'Chặn nguồn DDoS đã biết', sourceIp: '203.162.10.0/24', port: '*', action: 'DENY', priority: 'High', enabled: true },
    { id: 'FW-002', name: 'Giới hạn tốc độ HTTP', sourceIp: '0.0.0.0/0', port: '80, 443', action: 'LIMIT', priority: 'Medium', enabled: true },
    { id: 'FW-003', name: 'Cho phép mạng nội bộ', sourceIp: '192.168.0.0/16', port: '*', action: 'ALLOW', priority: 'High', enabled: true },
];

const initialBlacklist: BlacklistEntry[] = [
    { ip: '203.162.10.45', reason: 'Nguồn DDoS - SYN Flood', addedBy: 'AI tự động chặn', dateAdded: '27/12/2024 14:30', expires: 'Vĩnh viễn' },
    { ip: '45.142.120.88', reason: 'Tấn công UDP Flood', addedBy: 'AI tự động chặn', dateAdded: '27/12/2024 14:15', expires: '30 ngày' },
    { ip: '91.203.45.12', reason: 'Dò mật khẩu', addedBy: 'John Doe', dateAdded: '27/12/2024 11:20', expires: '7 ngày' },
];

const initialWhitelist: WhitelistEntry[] = [
    { ip: '8.8.8.8', description: 'Google DNS', addedBy: 'Hệ thống', dateAdded: '01/01/2024' },
    { ip: '192.168.1.0/24', description: 'Mạng văn phòng nội bộ', addedBy: 'Quản trị viên', dateAdded: '15/01/2024' },
];

// --- Add/Edit Firewall Rule Modal ---
interface RuleModalProps {
    rule?: FirewallRule;
    onClose: () => void;
    onSave: (rule: FirewallRule) => void;
}

const RuleModal: React.FC<RuleModalProps> = ({ rule, onClose, onSave }) => {
    const isEdit = !!rule;
    const [name, setName] = useState(rule?.name || '');
    const [sourceIp, setSourceIp] = useState(rule?.sourceIp || '');
    const [port, setPort] = useState(rule?.port || '*');
    const [action, setAction] = useState<FirewallRule['action']>(rule?.action || 'DENY');
    const [priority, setPriority] = useState<FirewallRule['priority']>(rule?.priority || 'Medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !sourceIp.trim()) return;
        onSave({
            id: rule?.id || `FW-${Date.now().toString().slice(-3)}`,
            name: name.trim(),
            sourceIp: sourceIp.trim(),
            port: port.trim() || '*',
            action,
            priority,
            enabled: rule?.enabled ?? true,
        });
    };

    return (
        <div className="modal active">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isEdit ? 'Sửa quy tắc' : 'Thêm quy tắc mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="create-incident-form">
                        <div className="form-group">
                            <label className="form-label">Tên quy tắc *</label>
                            <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="VD: Chặn SSH Brute Force" required autoFocus />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">IP nguồn *</label>
                                <input className="form-input" value={sourceIp} onChange={e => setSourceIp(e.target.value)} placeholder="VD: 10.0.0.0/8" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cổng</label>
                                <input className="form-input" value={port} onChange={e => setPort(e.target.value)} placeholder="VD: 22, 80" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Hành động</label>
                                <select className="form-select" value={action} onChange={e => setAction(e.target.value as FirewallRule['action'])}>
                                    <option value="DENY">TỪ CHỐI</option>
                                    <option value="LIMIT">GIỚI HẠN</option>
                                    <option value="ALLOW">CHO PHÉP</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mức độ ưu tiên</label>
                                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value as FirewallRule['priority'])}>
                                    <option value="High">Cao</option>
                                    <option value="Medium">Trung bình</option>
                                    <option value="Low">Thấp</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                            <button type="submit" className="btn btn-primary">{isEdit ? 'Lưu thay đổi' : 'Thêm quy tắc'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Confirm Dialog ---
interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => (
    <div className="modal active">
        <div className="modal-overlay" onClick={onCancel}></div>
        <div className="modal-content" style={{ maxWidth: 420 }}>
            <div className="modal-header">
                <h2>Xác nhận</h2>
                <button className="modal-close" onClick={onCancel}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="modal-body">
                <p style={{ color: '#E0E0E0', margin: '8px 0 20px' }}>{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
                </div>
            </div>
        </div>
    </div>
);

// --- Main View ---
export const PoliciesView: React.FC = () => {
    const { showNotification } = useNotification();
    const [firewallRules, setFirewallRules] = useState<FirewallRule[]>(initialFirewallRules);
    const [blacklist, setBlacklist] = useState<BlacklistEntry[]>(initialBlacklist);
    const [whitelist, setWhitelist] = useState<WhitelistEntry[]>(initialWhitelist);

    // Modal states
    const [ruleModal, setRuleModal] = useState<{ show: boolean; rule?: FirewallRule }>({ show: false });
    const [confirmDialog, setConfirmDialog] = useState<{ show: boolean; message: string; onConfirm: () => void }>({ show: false, message: '', onConfirm: () => { } });

    // --- Firewall Rule Handlers ---
    const handleToggleRule = (id: string) => {
        setFirewallRules(prev => prev.map(r => {
            if (r.id === id) {
                const updated = { ...r, enabled: !r.enabled };
                showNotification(`Quy tắc ${r.id} đã ${updated.enabled ? 'bật' : 'tắt'}`, updated.enabled ? 'success' : 'warning');
                return updated;
            }
            return r;
        }));
    };

    const handleSaveRule = (rule: FirewallRule) => {
        setFirewallRules(prev => {
            const idx = prev.findIndex(r => r.id === rule.id);
            if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = rule;
                showNotification(`Quy tắc ${rule.id} đã được cập nhật`, 'success');
                return updated;
            }
            showNotification(`Quy tắc ${rule.id} đã được tạo`, 'success');
            return [...prev, rule];
        });
        setRuleModal({ show: false });
    };

    const handleDeleteRule = (id: string) => {
        setConfirmDialog({
            show: true,
            message: `Bạn có chắc muốn xóa quy tắc ${id}?`,
            onConfirm: () => {
                setFirewallRules(prev => prev.filter(r => r.id !== id));
                showNotification(`Quy tắc ${id} đã bị xóa`, 'danger');
                setConfirmDialog({ show: false, message: '', onConfirm: () => { } });
            },
        });
    };

    // --- Blacklist/Whitelist Handlers ---
    const handleRemoveBlacklist = (ip: string) => {
        setConfirmDialog({
            show: true,
            message: `Bạn có chắc muốn xóa IP ${ip} khỏi danh sách đen?`,
            onConfirm: () => {
                setBlacklist(prev => prev.filter(e => e.ip !== ip));
                showNotification(`IP ${ip} đã được xóa khỏi danh sách đen`, 'success');
                setConfirmDialog({ show: false, message: '', onConfirm: () => { } });
            },
        });
    };

    const handleRemoveWhitelist = (ip: string) => {
        setConfirmDialog({
            show: true,
            message: `Bạn có chắc muốn xóa IP ${ip} khỏi danh sách trắng?`,
            onConfirm: () => {
                setWhitelist(prev => prev.filter(e => e.ip !== ip));
                showNotification(`IP ${ip} đã được xóa khỏi danh sách trắng`, 'success');
                setConfirmDialog({ show: false, message: '', onConfirm: () => { } });
            },
        });
    };

    // --- Export Handler ---
    const handleExport = () => {
        const data = { firewallRules, blacklist, whitelist };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `soc-chinh-sach-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Đã xuất dữ liệu chính sách thành công', 'success');
    };

    const actionBadge = (action: FirewallRule['action']) => {
        const labels: Record<string, string> = { DENY: 'TỪ CHỐI', LIMIT: 'GIỚI HẠN', ALLOW: 'CHO PHÉP' };
        const cls = action === 'DENY' ? 'badge-danger' : action === 'LIMIT' ? 'badge-warning' : 'badge-success';
        return <span className={`badge ${cls}`}>{labels[action]}</span>;
    };

    return (
        <section className="view-section active" id="policies-view">
            <div className="section-header">
                <h2>Quản lý Chính sách</h2>
                <div className="section-actions">
                    <button className="btn btn-secondary" onClick={handleExport}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 3h14v2H3zM3 8h14v2H3zM3 13h14v2H3z" />
                        </svg>
                        Xuất dữ liệu
                    </button>
                    <button className="btn btn-primary" onClick={() => setRuleModal({ show: true })}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3v14M3 10h14" />
                        </svg>
                        Thêm quy tắc
                    </button>
                </div>
            </div>

            <div className="policies-container">
                {/* Quy tắc tường lửa */}
                <div className="policy-section">
                    <h3>Quy tắc tường lửa</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>Mã quy tắc</th>
                                    <th>Tên</th>
                                    <th>IP nguồn</th>
                                    <th>Cổng</th>
                                    <th>Hành động</th>
                                    <th>Ưu tiên</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {firewallRules.map(rule => (
                                    <tr key={rule.id} style={{ opacity: rule.enabled ? 1 : 0.5 }}>
                                        <td className="monospace">{rule.id}</td>
                                        <td>{rule.name}</td>
                                        <td className="monospace">{rule.sourceIp}</td>
                                        <td className="monospace">{rule.port}</td>
                                        <td>{actionBadge(rule.action)}</td>
                                        <td>{rule.priority === 'High' ? 'Cao' : rule.priority === 'Medium' ? 'Trung bình' : 'Thấp'}</td>
                                        <td>
                                            <label className="toggle-switch">
                                                <input type="checkbox" checked={rule.enabled} onChange={() => handleToggleRule(rule.id)} />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <button className="btn-icon" title="Sửa" onClick={() => setRuleModal({ show: true, rule })}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-11 11L8 5l4 4-6.146 6.146a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168z" />
                                                </svg>
                                            </button>
                                            <button className="btn-icon" title="Xóa" onClick={() => handleDeleteRule(rule.id)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {firewallRules.length === 0 && (
                                    <tr><td colSpan={8} style={{ textAlign: 'center', color: '#6E6E80', padding: '24px' }}>Chưa có quy tắc nào</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Danh sách đen IP */}
                <div className="policy-section">
                    <h3>Danh sách đen IP</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>Địa chỉ IP</th>
                                    <th>Lý do</th>
                                    <th>Thêm bởi</th>
                                    <th>Ngày thêm</th>
                                    <th>Hết hạn</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blacklist.map(entry => (
                                    <tr key={entry.ip}>
                                        <td className="monospace">{entry.ip}</td>
                                        <td>{entry.reason}</td>
                                        <td>{entry.addedBy}</td>
                                        <td>{entry.dateAdded}</td>
                                        <td>{entry.expires}</td>
                                        <td>
                                            <button className="btn-icon" title="Xóa" onClick={() => handleRemoveBlacklist(entry.ip)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {blacklist.length === 0 && (
                                    <tr><td colSpan={6} style={{ textAlign: 'center', color: '#6E6E80', padding: '24px' }}>Danh sách đen trống</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Danh sách trắng IP */}
                <div className="policy-section">
                    <h3>Danh sách trắng IP</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>Địa chỉ IP</th>
                                    <th>Mô tả</th>
                                    <th>Thêm bởi</th>
                                    <th>Ngày thêm</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {whitelist.map(entry => (
                                    <tr key={entry.ip}>
                                        <td className="monospace">{entry.ip}</td>
                                        <td>{entry.description}</td>
                                        <td>{entry.addedBy}</td>
                                        <td>{entry.dateAdded}</td>
                                        <td>
                                            <button className="btn-icon" title="Xóa" onClick={() => handleRemoveWhitelist(entry.ip)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {whitelist.length === 0 && (
                                    <tr><td colSpan={5} style={{ textAlign: 'center', color: '#6E6E80', padding: '24px' }}>Danh sách trắng trống</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {ruleModal.show && (
                <RuleModal
                    rule={ruleModal.rule}
                    onClose={() => setRuleModal({ show: false })}
                    onSave={handleSaveRule}
                />
            )}
            {confirmDialog.show && (
                <ConfirmDialog
                    message={confirmDialog.message}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={() => setConfirmDialog({ show: false, message: '', onConfirm: () => { } })}
                />
            )}
        </section>
    );
};
