import React from 'react';

export const PoliciesView: React.FC = () => {
    return (
        <section className="view-section active" id="policies-view">
            <div className="section-header">
                <h2>Quản lý Chính sách</h2>
                <div className="section-actions">
                    <button className="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 3h14v2H3zM3 8h14v2H3zM3 13h14v2H3z" />
                        </svg>
                        Export
                    </button>
                    <button className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3v14M3 10h14" />
                        </svg>
                        Thêm quy tắc
                    </button>
                </div>
            </div>

            <div className="policies-container">
                {/* Firewall Rules */}
                <div className="policy-section">
                    <h3>Firewall Rules</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>Rule ID</th>
                                    <th>Name</th>
                                    <th>Source IP</th>
                                    <th>Port</th>
                                    <th>Action</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="monospace">FW-001</td>
                                    <td>Block Known DDoS Sources</td>
                                    <td className="monospace">203.162.10.0/24</td>
                                    <td className="monospace">*</td>
                                    <td><span className="badge badge-danger">DENY</span></td>
                                    <td>High</td>
                                    <td><label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="toggle-slider"></span>
                                    </label></td>
                                    <td>
                                        <button className="btn-icon" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-11 11L8 5l4 4-6.146 6.146a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168z" />
                                            </svg>
                                        </button>
                                        <button className="btn-icon" title="Delete">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="monospace">FW-002</td>
                                    <td>Rate Limit HTTP</td>
                                    <td className="monospace">0.0.0.0/0</td>
                                    <td className="monospace">80, 443</td>
                                    <td><span className="badge badge-warning">LIMIT</span></td>
                                    <td>Medium</td>
                                    <td><label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="toggle-slider"></span>
                                    </label></td>
                                    <td>
                                        <button className="btn-icon" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-11 11L8 5l4 4-6.146 6.146a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168z" />
                                            </svg>
                                        </button>
                                        <button className="btn-icon" title="Delete">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="monospace">FW-003</td>
                                    <td>Allow Internal Network</td>
                                    <td className="monospace">192.168.0.0/16</td>
                                    <td className="monospace">*</td>
                                    <td><span className="badge badge-success">ALLOW</span></td>
                                    <td>High</td>
                                    <td><label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="toggle-slider"></span>
                                    </label></td>
                                    <td>
                                        <button className="btn-icon" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-11 11L8 5l4 4-6.146 6.146a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168z" />
                                            </svg>
                                        </button>
                                        <button className="btn-icon" title="Delete">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* IP Blacklist */}
                <div className="policy-section">
                    <h3>IP Blacklist</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>IP Address</th>
                                    <th>Reason</th>
                                    <th>Added By</th>
                                    <th>Date Added</th>
                                    <th>Expires</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="monospace">203.162.10.45</td>
                                    <td>DDoS Source - SYN Flood</td>
                                    <td>AI Auto-block</td>
                                    <td>27/12/2024 14:30</td>
                                    <td>Permanent</td>
                                    <td>
                                        <button className="btn-icon" title="Remove">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="monospace">45.142.120.88</td>
                                    <td>UDP Flood Attack</td>
                                    <td>AI Auto-block</td>
                                    <td>27/12/2024 14:15</td>
                                    <td>30 days</td>
                                    <td>
                                        <button className="btn-icon" title="Remove">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="monospace">91.203.45.12</td>
                                    <td>Brute Force Attempts</td>
                                    <td>John Doe</td>
                                    <td>27/12/2024 11:20</td>
                                    <td>7 days</td>
                                    <td>
                                        <button className="btn-icon" title="Remove">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* IP Whitelist */}
                <div className="policy-section">
                    <h3>IP Whitelist</h3>
                    <div className="table-container">
                        <table className="policy-table">
                            <thead>
                                <tr>
                                    <th>IP Address</th>
                                    <th>Description</th>
                                    <th>Added By</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="monospace">8.8.8.8</td>
                                    <td>Google DNS</td>
                                    <td>System</td>
                                    <td>01/01/2024</td>
                                    <td>
                                        <button className="btn-icon" title="Remove">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="monospace">192.168.1.0/24</td>
                                    <td>Internal Office Network</td>
                                    <td>Admin</td>
                                    <td>15/01/2024</td>
                                    <td>
                                        <button className="btn-icon" title="Remove">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
