import React from 'react';
import { motion } from 'framer-motion';
import RadialGauge from './RadialGauge';

export interface Deal {
  id: string;
  pitchId: number;
  trust: number;
  amount: string;
  sector: string;
  logo: string;
  name: string;
  description: string;
}

interface DealCardProps {
  deal: Deal;
  onClick: (deal: Deal) => void;
  index: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.15,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-dark-800 p-6 rounded-xl border border-gray-700 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
      onClick={() => onClick(deal)}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={deal.logo} alt={deal.name} className="w-10 h-10 object-cover" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg text-white">{deal.name}</h3>
          <span className="text-sm text-gray-400">{deal.sector}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
        {deal.description}
      </p>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Investment:</span>
          <span className="font-medium text-white">{deal.amount}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Trust Score:</span>
          <div className="flex items-center">
            <span className="font-bold text-lg mr-1 text-primary">{deal.trust}</span>
            <span className="text-gray-400">/100</span>
          </div>
        </div>
        
        <div className="mt-2 bg-gray-700 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: `${deal.trust}%`,
              transition: { delay: 0.3 + (index * 0.15), duration: 0.8, ease: "easeOut" } 
            }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;