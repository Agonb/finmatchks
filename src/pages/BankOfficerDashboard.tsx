import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import LoanTable, { Loan } from '../components/LoanTable';
import LoanDrawer from '../components/LoanDrawer';
import Toast from '../components/Toast';
import { useAppContext } from '../context/AppContext';

const BankOfficerDashboard: React.FC = () => {
  const { language } = useAppContext();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [pitches, setPitches] = useState<string[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const [loansData, pitchesData] = await Promise.all([
          import('../mock/bankLoans.json'),
          import('../mock/pitches.json')
        ]);
        setLoans(loansData.loans);
        setPitches(pitchesData.pitches);
      } catch (error) {
        console.error('Failed to load mock data:', error);
      }
    };
    
    loadMockData();
  }, []);

  const handleViewLoan = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handlePreApprove = () => {
    setSelectedLoan(null);
    setToast({
      show: true,
      message: language === 'en' ? 'Loan pre-approved (demo only)' : 'Kredia u para-miratua (vetëm demo)',
      type: 'success'
    });
  };

  const handleRequestInfo = () => {
    setSelectedLoan(null);
    setToast({
      show: true,
      message: language === 'en' ? 'Information request sent (mock)' : 'Kërkesa për informacion u dërgua (mock)',
      type: 'info'
    });
  };

  // Translations
  const translations = {
    en: {
      title: 'Loan Queue',
      analytics: 'Analytics',
      newApplications: 'New Applications',
    },
    al: {
      title: 'Radha e Kredive',
      analytics: 'Analitika',
      newApplications: 'Aplikime të Reja',
    }
  };

  const text = translations[language];

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 250 : 0,
          opacity: isSidebarOpen ? 1 : 0
        }}
        className="bg-dark-800 border-r border-gray-700 hidden md:block overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-white mb-8">FinFund KS</h1>
          
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-white bg-primary bg-opacity-20 rounded-lg"
            >
              {text.title}
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg"
            >
              {text.analytics}
            </a>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-white">FinFund KS</h1>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{text.newApplications}</h2>
          </div>

          {/* Loan Table */}
          <div className="bg-dark-800 rounded-xl overflow-hidden">
            <LoanTable loans={loans} onViewLoan={handleViewLoan} />
          </div>
        </div>

        {/* Loan Drawer */}
        {selectedLoan && (
          <LoanDrawer
            loan={selectedLoan}
            pitch={pitches[selectedLoan.pitchId]}
            onClose={() => setSelectedLoan(null)}
          />
        )}

        {/* Toast */}
        {toast?.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default BankOfficerDashboard;