import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterPageProps {
    onSwitchToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!name.trim()) {
            setError('Vui lòng nhập họ và tên');
            return;
        }
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
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const result = register(name, email, password);
            if (!result.success) {
                setError(result.error || 'Đăng ký thất bại');
            }
            setIsLoading(false);
        }, 800);
    };

    // Password strength indicator
    const getPasswordStrength = (): { level: number; label: string; color: string } => {
        if (!password) return { level: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 1) return { level: 1, label: 'Yếu', color: 'var(--color-danger)' };
        if (strength <= 3) return { level: 2, label: 'Trung bình', color: 'var(--color-warning)' };
        return { level: 3, label: 'Mạnh', color: 'var(--color-success)' };
    };

    const passwordStrength = getPasswordStrength();

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
                        <h2>Đăng ký tài khoản</h2>
                        <p>Tạo tài khoản mới để truy cập hệ thống</p>
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
                            <label htmlFor="register-name">Họ và tên</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <input
                                    id="register-name"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Nguyễn Văn A"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-email">Email</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 4L12 13L2 4" />
                                </svg>
                                <input
                                    id="register-email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="email@soc.vn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-password">Mật khẩu</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <input
                                    id="register-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="auth-input"
                                    placeholder="Tối thiểu 6 ký tự"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
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
                            {password && (
                                <div className="auth-password-strength">
                                    <div className="strength-bars">
                                        {[1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className="strength-bar"
                                                style={{
                                                    backgroundColor: level <= passwordStrength.level ? passwordStrength.color : 'var(--bg-hover)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="strength-label" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-confirm">Xác nhận mật khẩu</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <input
                                    id="register-confirm"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="auth-input"
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
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
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                    Đăng ký
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Đã có tài khoản?</span>
                        <button className="auth-link" onClick={onSwitchToLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>

                <p className="auth-copyright">© 2024 SOC Dashboard — UIT Security Team</p>
            </div>
        </div>
    );
};
