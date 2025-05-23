import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import RoleSelector from '../components/RoleSelector';
import { useAppContext } from '../context/AppContext';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, role } = useAppContext();
  
  const handleStart = () => {
    if (role) {
      navigate('/pitch');
    }
  };
  
  const translations = {
    en: {
      title: 'Connect with the perfect funding for your business',
      subtitle: 'Kosovo\'s intelligent funding platform matches founders with the right financial opportunities',
      selectRole: 'Select your role:',
      start: 'Start'
    },
    al: {
      title: 'Lidhuni me financimin e përkryer për biznesin tuaj',
      subtitle: 'Platforma inteligjente e financimit të Kosovës lidh themeluesit me mundësitë e duhura financiare',
      selectRole: 'Zgjidhni rolin tuaj:',
      start: 'Fillo'
    }
  };
  
  const text = translations[language];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2,
      }
    },
    exit: {
      x: '-100%',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      }
    }
  };
  
  const cardVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background Image (60%) */}
      <div className="h-48 md:h-auto md:w-3/5 bg-gray-800 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.midjourney.com/1fcbf6ca-2c9b-4869-ad43-a03808977b2f/0_3.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        
        <div className="absolute top-10 left-0 p-6">
        <img
            src="/logo.png"
            alt="Logo"
            className="h-20 md:h-28 w-auto"
          />
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 p-6 md:p-12 max-w-xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            {text.title}
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-200 mb-6"
            variants={itemVariants}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>
      </div>
      
      {/* Content Card (40%) */}
      <motion.div 
        className="flex-1 flex flex-col bg-dark-800 p-6 md:p-12"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="flex justify-end mb-8">
          <LanguageToggle />
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h2 className="text-xl font-medium text-white mb-6">
            {text.selectRole}
          </h2>
          
          <RoleSelector />
          
          <div className="mt-12">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              disabled={!role}
              id="cta-start"
              className={`
                w-full flex items-center justify-center py-3 px-4
                rounded-lg text-white font-medium
                transition-all duration-200
                ${role ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-700 cursor-not-allowed'}
              `}
            >
              {text.start}
              <ChevronRight size={18} className="ml-1" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;