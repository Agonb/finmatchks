import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import WelcomeScreen from './pages/WelcomeScreen';
import PitchCoachScreen from './pages/PitchCoachScreen';
import FundingMatchesScreen from './pages/FundingMatchesScreen';
import TrustScoreScreen from './pages/TrustScoreScreen';
import SecureChatScreen from './pages/SecureChatScreen';
import InvestorDealboardScreen from './pages/InvestorDealboardScreen';
import BankOfficerDashboard from './pages/BankOfficerDashboard';

// Context
import { AppContextProvider } from './context/AppContext';

function App() {
  const location = useLocation();

  return (
    <AppContextProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/pitch" element={<PitchCoachScreen />} />
            <Route path="/matches" element={<FundingMatchesScreen />} />
            <Route path="/trust" element={<TrustScoreScreen />} />
            <Route path="/chat" element={<SecureChatScreen />} />
            <Route path="/investor" element={<InvestorDealboardScreen />} />
            <Route path="/bank" element={<BankOfficerDashboard />} />
          </Routes>
        </AnimatePresence>
      </div>
    </AppContextProvider>
  );
}

export default App;