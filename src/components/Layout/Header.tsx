import React, { useState } from 'react';
import type { ViewType, User } from '../../types';

interface HeaderProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    user: User | null;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, onLogout }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="8" fill="#1890FF" />
                        <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" strokeWidth="2" fill="none" />
                        <circle cx="16" cy="16" r="3" fill="white" />
                    </svg>
                    <h1>Bảng điều khiển SOC</h1>
                </div>
            </div>
            <div className="header-center">
                <nav className="main-nav">
                    <button
                        className={`nav-btn ${currentView === 'monitoring' ? 'active' : ''}`}
                        onClick={() => onViewChange('monitoring')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10h3l2-6 4 12 2-6h3" />
                        </svg>
                        Giám sát
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'incidents' ? 'active' : ''}`}
                        onClick={() => onViewChange('incidents')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" fill="none" />
                            <line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" />
                        </svg>
                        Sự cố
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'policies' ? 'active' : ''}`}
                        onClick={() => onViewChange('policies')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <rect x="4" y="4" width="12" height="12" rx="1" stroke="currentColor" fill="none" />
                            <line x1="7" y1="8" x2="13" y2="8" stroke="currentColor" />
                            <line x1="7" y1="12" x2="13" y2="12" stroke="currentColor" />
                        </svg>
                        Chính sách
                    </button>
                </nav>
            </div>
            <div className="header-right">
                <div className="system-status">
                    <span className="status-dot status-safe"></span>
                    <span className="status-text">Hệ thống an toàn</span>
                </div>
                <div
                    className="user-profile"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                >
                    <div className="user-avatar">{user?.avatar || 'AD'}</div>
                    <div className="user-info-block">
                        <span className="user-name">{user?.name || 'Quản trị viên'}</span>
                        <span className="user-role">{user?.role || ''}</span>
                    </div>
                    <svg className="user-dropdown-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>

                    {showUserMenu && (
                        <div className="user-menu">
                            <div className="user-menu-header">
                                <div className="user-avatar" style={{ width: 40, height: 40, fontSize: 16 }}>{user?.avatar || 'AD'}</div>
                                <div>
                                    <div className="user-menu-name">{user?.name}</div>
                                    <div className="user-menu-email">{user?.email}</div>
                                </div>
                            </div>
                            <div className="user-menu-divider"></div>
                            <button className="user-menu-item user-menu-logout" onClick={(e) => { e.stopPropagation(); onLogout(); }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

