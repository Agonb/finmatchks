import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import FundingCard, { FundingMatch } from '../components/FundingCard';
import MatchDrawer from '../components/MatchDrawer';
import Toast from '../components/Toast';
import { useAppContext } from '../context/AppContext';

const FundingMatchesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAppContext();
  const [matches, setMatches] = useState<FundingMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<FundingMatch | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string } | null>(null);
  
  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const data = await import('../mock/matches.json');
        setMatches(data.matches);
      } catch (error) {
        console.error('Failed to load mock matches data:', error);
      }
    };
    
    loadMockData();
  }, []);
  
  // Handle card click
  const handleCardClick = (match: FundingMatch) => {
    setSelectedMatch(match);
  };
  
  // Handle apply
  const handleApply = (matchId: string) => {
    // Close the drawer
    setSelectedMatch(null);
    
    // Show success toast
    setToast({
      show: true,
      message: language === 'en' 
        ? 'Application submitted successfully!' 
        : 'Aplikimi u dorëzua me sukses!'
    });
  };
  
  // Translations
  const translations = {
    en: {
      title: 'Your perfect funding matches',
      subtitle: 'Based on your business idea, we found these funding opportunities',
      continueButton: 'Check Your Trust Score'
    },
    al: {
      title: 'Përputhjet tuaja të përkryera të financimit',
      subtitle: 'Bazuar në idenë tuaj të biznesit, ne gjetëm këto mundësi financimi',
      continueButton: 'Kontrolloni Pikët e Besimit'
    }
  };
  
  const text = translations[language];
  
  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="max-w-container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-bold text-white mb-2 inline-block"
            animate={{ 
              textShadow: ['0 0 0px #7E3EFF', '0 0 10px #7E3EFF', '0 0 0px #7E3EFF'],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {text.title}
          </motion.h1>
          <p className="text-gray-400">{text.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {matches.map((match, index) => (
            <FundingCard 
              key={match.id} 
              match={match} 
              onClick={handleCardClick}
              index={index}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/trust')}
            className="flex items-center justify-center py-3 px-8 bg-primary rounded-lg text-white font-medium hover:bg-primary-dark transition-all duration-200"
          >
            {text.continueButton}
            <ChevronRight size={18} className="ml-1" />
          </motion.button>
        </div>
        
        {/* Match Drawer */}
        {selectedMatch && (
          <MatchDrawer 
            match={selectedMatch} 
            onClose={() => setSelectedMatch(null)}
            onApply={handleApply}
          />
        )}
        
        {/* Toast */}
        {toast?.show && (
          <Toast
            message={toast.message}
            type="success"
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default FundingMatchesScreen;