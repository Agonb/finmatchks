import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Copy, CheckCircle } from 'lucide-react';

interface VaultCardProps {
  onShareLink: () => void;
  copied: boolean;
}

const VaultCard: React.FC<VaultCardProps> = ({ onShareLink, copied }) => {
  return (
    <div className="bg-dark-800 rounded-lg p-4 h-full">
      <h3 className="text-md font-medium text-white mb-3">Secure Vault</h3>
      
      <div className="space-y-3 mb-6">
        <div className="bg-dark-700 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center">
            <Lock size={16} className="text-primary" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-white">Business Plan.pdf</div>
            <div className="text-xs text-gray-400">2.4 MB - Encrypted</div>
          </div>
        </div>
        
        <div className="bg-dark-700 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center">
            <Lock size={16} className="text-primary" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-white">Financial_Projections.xlsx</div>
            <div className="text-xs text-gray-400">1.1 MB - Encrypted</div>
          </div>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={copied ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.4 }}
        onClick={onShareLink}
        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {copied ? (
          <>
            <CheckCircle size={16} className="mr-2" />
            Link Copied!
          </>
        ) : (
          <>
            <Copy size={16} className="mr-2" />
            Copy Share Link
          </>
        )}
      </motion.button>
    </div>
  );
};

export default VaultCard;