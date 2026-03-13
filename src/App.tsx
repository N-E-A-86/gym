import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import WorkoutHistory from './components/WorkoutHistory';
import ProgramArchitect from './components/ProgramArchitect';
import AIChat from './components/AIChat';
import Admin from './components/Admin';
import Store from './components/Store';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'onboarding':
        return <Onboarding />;
      case 'history':
        return <WorkoutHistory />;
      case 'architect':
        return <ProgramArchitect />;
      case 'chat':
        return <AIChat />;
      case 'admin':
        return <Admin />;
      case 'store':
        return <Store />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      onScreenChange={(screen) => setCurrentScreen(screen)}
    >
      <div className="relative">
        {renderScreen()}
      </div>
    </Layout>
  );
}
