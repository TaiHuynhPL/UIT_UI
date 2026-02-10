import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { MonitoringView } from './features/Monitoring/MonitoringView';
import { IncidentsView } from './features/Incidents/IncidentsView';
import { PoliciesView } from './features/Policies/PoliciesView';
import type { ViewType } from './types';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('monitoring');

  return (
    <NotificationProvider>
      <div className="app">
        <Header currentView={currentView} onViewChange={setCurrentView} />

        <main className="main-content">
          {currentView === 'monitoring' && <MonitoringView />}
          {currentView === 'incidents' && <IncidentsView />}
          {currentView === 'policies' && <PoliciesView />}
        </main>
      </div>
    </NotificationProvider>
  );
}

export default App;
