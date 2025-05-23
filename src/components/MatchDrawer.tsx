import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { FundingMatch } from './FundingCard';

interface MatchDrawerProps {
  match: FundingMatch | null;
  onClose: () => void;
  onApply: (matchId: string) => void;
}

const MatchDrawer: React.FC<MatchDrawerProps> = ({ match, onClose, onApply }) => {
  if (!match) return null;

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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-dark-800 shadow-xl overflow-y-auto">
                <div className="px-4 py-6 sm:px-6 border-b border-gray-700">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-white">
                      Funding Details
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
                
                <div className="relative flex-1 px-4 sm:px-6 py-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-dark-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={match.logo} alt={match.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">{match.name}</h3>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-20 text-primary-light">
                          {match.type}
                        </span>
                        <span className="ml-2 text-sm text-gray-400">{match.amount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Match Score</span>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-1 text-primary">{match.matchScore}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${match.matchScore}%`, transition: { duration: 0.8 } }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="prose prose-sm prose-invert mb-6">
                    <h4 className="text-lg font-medium text-white mb-2">About this Opportunity</h4>
                    <div className="text-gray-300 leading-relaxed space-y-2">
                      {match.description.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Application Deadline</span>
                      <span className="text-primary font-medium">{match.deadline}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Submit your application before this date to be considered
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 px-4 py-5 sm:px-6">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-dark-700 border border-gray-600 rounded-lg hover:bg-dark-600"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark-800"
                      onClick={() => onApply(match.id)}
                    >
                      <Check size={18} className="mr-2" />
                      Apply Now
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

export default MatchDrawer;