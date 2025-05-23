import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, MessageSquare } from 'lucide-react';
import { Deal } from './DealCard';
import RadialGauge from './RadialGauge';

interface DealDrawerProps {
  deal: Deal | null;
  pitch: string;
  onClose: () => void;
}

const DealDrawer: React.FC<DealDrawerProps> = ({ deal, pitch, onClose }) => {
  const navigate = useNavigate();
  
  if (!deal) return null;

  const handleOpenChat = () => {
    navigate(`/chat?deal=${deal.id}&as=investor`);
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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-dark-800 shadow-xl overflow-y-auto">
                <div className="px-4 py-6 sm:px-6 border-b border-gray-700">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-white">
                      Deal Details
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
                      <img src={deal.logo} alt={deal.name} className="w-12 h-12 object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">{deal.name}</h3>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-20 text-primary-light">
                          {deal.sector}
                        </span>
                        <span className="ml-2 text-sm text-gray-400">{deal.amount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Trust Score</span>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-1 text-primary">{deal.trust}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${deal.trust}%`, transition: { duration: 0.8 } }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="prose prose-sm prose-invert mb-6">
                    <h4 className="text-lg font-medium text-white mb-2">Pitch</h4>
                    <div className="text-gray-300 leading-relaxed space-y-2">
                      {pitch.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
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
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark-800"
                      onClick={handleOpenChat}
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Open Secure Chat
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

export default DealDrawer;