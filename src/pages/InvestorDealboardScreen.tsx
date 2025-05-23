import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DealCard, { Deal } from '../components/DealCard';
import DealDrawer from '../components/DealDrawer';
import { useAppContext } from '../context/AppContext';

const InvestorDealboardScreen: React.FC = () => {
  const { language } = useAppContext();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [pitches, setPitches] = useState<string[]>([]);
  const [avgTrust, setAvgTrust] = useState(0);
  
  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const [dealsData, pitchesData] = await Promise.all([
          import('../mock/deals.json'),
          import('../mock/pitches.json')
        ]);
        
        setDeals(dealsData.deals);
        setPitches(pitchesData.pitches);
        
        // Calculate average trust score
        const avg = dealsData.deals.reduce((acc, deal) => acc + deal.trust, 0) / dealsData.deals.length;
        setAvgTrust(Math.round(avg));
      } catch (error) {
        console.error('Failed to load mock data:', error);
      }
    };
    
    loadMockData();
  }, []);
  
  // Handle card click
  const handleCardClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };
  
  // Translations
  const translations = {
    en: {
      newDeals: "new verified deals",
      avgTrust: "Avg Trust"
    },
    al: {
      newDeals: "marrëveshje të reja të verifikuara",
      avgTrust: "Besimi mesatar"
    }
  };
  
  const text = translations[language];
  
  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="max-w-container mx-auto">
        <motion.div
          className="bg-dark-800 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">{deals.length}</span>
              <span className="ml-2 text-xl text-gray-400">{text.newDeals}</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-gray-400 mr-2">{text.avgTrust}</span>
              <span className="text-2xl font-bold text-primary">{avgTrust}</span>
              <span className="text-xl text-gray-400">/100</span>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <DealCard 
              key={deal.id} 
              deal={deal} 
              onClick={handleCardClick}
              index={index}
            />
          ))}
        </div>
        
        {/* Deal Drawer */}
        {selectedDeal && (
          <DealDrawer 
            deal={selectedDeal}
            pitch={pitches[selectedDeal.pitchId]}
            onClose={() => setSelectedDeal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default InvestorDealboardScreen;