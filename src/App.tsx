import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { MonitoringView } from './features/Monitoring/MonitoringView';
import { IncidentsView } from './features/Incidents/IncidentsView';
import { PoliciesView } from './features/Policies/PoliciesView';
import { LoginPage } from './features/Auth/LoginPage';
import { RegisterPage } from './features/Auth/RegisterPage';
import type { ViewType } from './types';
import './index.css';

type AuthPage = 'login' | 'register';

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('monitoring');
  const [authPage, setAuthPage] = useState<AuthPage>('login');

  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <LoginPage onSwitchToRegister={() => setAuthPage('register')} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />
    );
  }

  return (
    <NotificationProvider>
      <div className="app">
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
          onLogout={logout}
        />

        <main className="main-content">
          {currentView === 'monitoring' && <MonitoringView />}
          {currentView === 'incidents' && <IncidentsView />}
          {currentView === 'policies' && <PoliciesView />}
        </main>
      </div>
    </NotificationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

