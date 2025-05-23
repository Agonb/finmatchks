import React from 'react';
import { motion } from 'framer-motion';

export interface FundingMatch {
  id: string;
  logo: string;
  name: string;
  type: string;
  amount: string;
  deadline: string;
  matchScore: number;
  description: string;
}

interface FundingCardProps {
  match: FundingMatch;
  onClick: (match: FundingMatch) => void;
  index: number;
}

const FundingCard: React.FC<FundingCardProps> = ({ match, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.2,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-dark-800 p-6 rounded-xl border border-gray-700 cursor-pointer shadow-lg"
      onClick={() => onClick(match)}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={match.logo} alt={match.name} className="w-10 h-10 object-contain" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg text-white">{match.name}</h3>
          <span className="text-sm text-gray-400">{match.type}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Amount:</span>
          <span className="font-medium">{match.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Deadline:</span>
          <span className="font-medium">{match.deadline}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Match Score:</span>
            <div className="flex items-center">
              <span className="font-bold text-lg mr-1 text-primary">{match.matchScore}</span>
              <span className="text-gray-400">/100</span>
            </div>
          </div>
          <div className="mt-2 bg-gray-700 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${match.matchScore}%`,
                transition: { delay: 0.3 + (index * 0.2), duration: 0.8, ease: "easeOut" } 
              }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FundingCard;