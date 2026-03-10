import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface StoredUser {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => { success: boolean; error?: string };
    register: (name: string, email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getStoredUsers(): StoredUser[] {
    try {
        const data = localStorage.getItem('soc_users');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveStoredUsers(users: StoredUser[]) {
    localStorage.setItem('soc_users', JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Restore session on mount
    useEffect(() => {
        try {
            const session = localStorage.getItem('soc_session');
            if (session) {
                setUser(JSON.parse(session));
            }
        } catch {
            localStorage.removeItem('soc_session');
        }
    }, []);

    const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
        const users = getStoredUsers();
        const found = users.find((u) => u.email === email);

        if (!found) {
            return { success: false, error: 'Email không tồn tại trong hệ thống' };
        }

        if (found.password !== password) {
            return { success: false, error: 'Mật khẩu không chính xác' };
        }

        const loggedInUser: User = {
            id: crypto.randomUUID(),
            name: found.name,
            email: found.email,
            role: found.role,
            avatar: getInitials(found.name),
        };

        setUser(loggedInUser);
        localStorage.setItem('soc_session', JSON.stringify(loggedInUser));
        return { success: true };
    }, []);

    const register = useCallback((name: string, email: string, password: string): { success: boolean; error?: string } => {
        const users = getStoredUsers();

        if (users.some((u) => u.email === email)) {
            return { success: false, error: 'Email này đã được đăng ký' };
        }

        const newUser: StoredUser = {
            name,
            email,
            password,
            role: 'Nhà phân tích SOC',
        };

        users.push(newUser);
        saveStoredUsers(users);

        // Auto login after register
        const loggedInUser: User = {
            id: crypto.randomUUID(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: getInitials(newUser.name),
        };

        setUser(loggedInUser);
        localStorage.setItem('soc_session', JSON.stringify(loggedInUser));
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('soc_session');
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
