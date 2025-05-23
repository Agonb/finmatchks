import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Loan } from './LoanTable';
import RadialGauge from './RadialGauge';
import Toast from './Toast';

interface LoanDrawerProps {
  loan: Loan | null;
  pitch: string;
  onClose: () => void;
}

const LoanDrawer: React.FC<LoanDrawerProps> = ({ loan, pitch, onClose }) => {
  if (!loan) return null;

  const handlePreApprove = () => {
    onClose();
    // Show success toast (handled by parent)
  };

  const handleRequestInfo = () => {
    onClose();
    // Show warning toast (handled by parent)
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'KYC':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'AML':
        return <CheckCircle size={16} className="text-blue-400" />;
      case 'Collateral':
        return <CheckCircle size={16} className="text-yellow-400" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" />
          
          <motion.div 
            className="fixed inset-y-0 right-0 max-w-full flex"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-dark-800 shadow-xl">
                <div className="px-4 py-6 sm:px-6 border-b border-gray-700">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-white">
                      Loan Application
                    </h2>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={onClose}
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-dark-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={loan.logo} alt={loan.company} className="w-12 h-12 object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">{loan.company}</h3>
                      <div className="mt-1">
                        <span className="text-sm text-gray-400">Requested amount: </span>
                        <span className="text-sm font-medium text-white">€{loan.amount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Trust Score</div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-primary">{loan.trust}</span>
                        <span className="text-gray-400 ml-1">/100</span>
                      </div>
                    </div>
                    
                    <div className="bg-dark-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Readiness</div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-primary">{loan.readiness}</span>
                        <span className="text-gray-400 ml-1">/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Verification Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {loan.badges.map((badge) => (
                        <div
                          key={badge}
                          className="flex items-center px-3 py-1 bg-dark-700 rounded-full"
                        >
                          {getBadgeIcon(badge)}
                          <span className="ml-2 text-sm text-white">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Encrypted Documents</h4>
                    <div className="space-y-2">
                      {loan.files.map((file) => (
                        <div
                          key={file.name}
                          className="flex items-center justify-between p-3 bg-dark-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            <Lock size={16} className="text-primary" />
                            <span className="ml-2 text-sm text-white">{file.name}</span>
                            <span className="ml-2 text-xs text-gray-400">{file.size}</span>
                          </div>
                          <button className="text-primary hover:text-primary-light">
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="prose prose-sm prose-invert">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Business Summary</h4>
                    <div className="text-sm text-gray-300">
                      {pitch.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 px-4 py-5 sm:px-6">
                  <div className="flex justify-between space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRequestInfo}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-dark-700 border border-gray-600 rounded-lg hover:bg-dark-600"
                    >
                      Request Info
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePreApprove}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                    >
                      Pre-Approve
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default LoanDrawer;