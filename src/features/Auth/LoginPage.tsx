import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginPageProps {
    onSwitchToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email.trim()) {
            setError('Vui lòng nhập email');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Email không hợp lệ');
            return;
        }
        if (!password) {
            setError('Vui lòng nhập mật khẩu');
            return;
        }

        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const result = login(email, password);
            if (!result.success) {
                setError(result.error || 'Đăng nhập thất bại');
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="auth-page">
            {/* Animated background decorations */}
            <div className="auth-bg-decoration">
                <div className="auth-bg-orb auth-bg-orb-1"></div>
                <div className="auth-bg-orb auth-bg-orb-2"></div>
                <div className="auth-bg-orb auth-bg-orb-3"></div>
                <div className="auth-bg-grid"></div>
            </div>

            <div className="auth-container">
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">
                        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="#1890FF" />
                            <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="16" cy="16" r="3" fill="white" />
                        </svg>
                    </div>
                    <h1 className="auth-logo-text">SOC Dashboard</h1>
                    <p className="auth-logo-subtitle">Trung tâm Điều hành An ninh mạng</p>
                </div>

                {/* Card */}
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2>Đăng nhập</h2>
                        <p>Nhập thông tin tài khoản để truy cập hệ thống</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="auth-error">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0V5zm.75 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="auth-field">
                            <label htmlFor="login-email">Email</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 4L12 13L2 4" />
                                </svg>
                                <input
                                    id="login-email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="admin@soc.vn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="login-password">Mật khẩu</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="auth-spinner"></span>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Chưa có tài khoản?</span>
                        <button className="auth-link" onClick={onSwitchToRegister}>
                            Đăng ký ngay
                        </button>
                    </div>
                </div>

                <p className="auth-copyright">© 2024 SOC Dashboard — UIT Security Team</p>
            </div>
        </div>
    );
};
