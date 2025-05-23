import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Users, ChevronRight } from 'lucide-react';
import RadialGauge from '../components/RadialGauge';
import { useAppContext } from '../context/AppContext';

const TrustScoreScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, role, userProfile } = useAppContext();
  
  // Translations
  const translations = {
    en: {
      title: 'Trust Score',
      subtitle: 'Your financial trust profile',
      badgeTitle: 'Trust Badges',
      tipTitle: 'How to Improve',
      tips: [
        'Complete all sections of your business profile',
        'Upload verified financial documents',
        'Connect with more peer reviewers',
        'Maintain regular account activity'
      ],
      continueButton: 'Open Secure Chat',
      womenInBusiness: 'Eligible for Women in Business Grant'
    },
    al: {
      title: 'Rezultati i Besimit',
      subtitle: 'Profili juaj i besimit financiar',
      badgeTitle: 'Medaljet e Besimit',
      tipTitle: 'Si të Përmirësoheni',
      tips: [
        'Plotësoni të gjitha seksionet e profilit tuaj të biznesit',
        'Ngarkoni dokumente financiare të verifikuara',
        'Lidhuni me më shumë recensues',
        'Mbani aktivitet të rregullt të llogarisë'
      ],
      continueButton: 'Hapni Bisedën e Sigurt',
      womenInBusiness: 'E përshtatshme për Grantin e Grave në Biznes'
    }
  };
  
  const text = translations[language];
  
  // Badge icons
  const getBadgeIcon = (badge: string) => {
    if (badge.includes('KYC')) return <CheckCircle size={18} className="text-green-400" />;
    if (badge.includes('Vault')) return <Lock size={18} className="text-primary" />;
    if (badge.includes('Peer')) return <Users size={18} className="text-blue-400" />;
    return null;
  };
  
  // Special eligibility banner
  const showEligibilityBanner = role === 'founder' && userProfile.sex === 'female';
  
  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="max-w-container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">{text.title}</h1>
          <p className="text-gray-400">{text.subtitle}</p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mb-12">
          {/* Trust Score Gauge */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <RadialGauge score={userProfile.trustScore} size={280} />
            </div>
            
            {/* Badges */}
            <div className="bg-dark-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-4">{text.badgeTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {userProfile.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center px-3 py-2 bg-dark-700 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <span className="mr-2">{getBadgeIcon(badge)}</span>
                    <span className="text-sm font-medium text-gray-200">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Tips Card */}
          <motion.div
            className="bg-dark-800 rounded-xl p-6 w-full max-w-md lg:max-w-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-medium text-white mb-4">{text.tipTitle}</h3>
            <ul className="space-y-3">
              {text.tips.map((tip, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </span>
                  <span className="text-sm text-gray-300">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Special Eligibility Banner */}
        {showEligibilityBanner && (
          <motion.div
            className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 mb-8 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-3 w-3 bg-primary rounded-full animate-pulse mr-2"></div>
            <span className="font-medium text-primary">
              {text.womenInBusiness}
            </span>
          </motion.div>
        )}
        
        {/* Continue Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/chat')}
            className="flex items-center justify-center py-3 px-8 bg-primary rounded-lg text-white font-medium hover:bg-primary-dark transition-all duration-200"
          >
            {text.continueButton}
            <ChevronRight size={18} className="ml-1" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreScreen;