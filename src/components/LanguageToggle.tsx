import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useAppContext();
  
  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('al')}
        className={`p-2 rounded-full ${language === 'al' ? 'bg-primary bg-opacity-20 ring-2 ring-primary' : 'hover:bg-gray-800'}`}
        aria-label="Albanian language"
      >
        <span className="text-xl" role="img" aria-label="Albanian flag">🇦🇱</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('en')}
        className={`p-2 rounded-full ${language === 'en' ? 'bg-primary bg-opacity-20 ring-2 ring-primary' : 'hover:bg-gray-800'}`}
        aria-label="English language"
      >
        <span className="text-xl" role="img" aria-label="English flag">🇬🇧</span>
      </motion.button>
    </div>
  );
};

export default LanguageToggle;