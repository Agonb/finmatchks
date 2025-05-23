import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { useSkeleton } from '../hooks/useSkeleton';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Sparkles } from 'lucide-react';

const PitchCoachScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, idea, setIdea, setPitch } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mockPitch, setMockPitch] = useState('');
  const { renderSkeleton } = useSkeleton(8, isGenerating && !mockPitch);
  const { displayText, isComplete } = useTypewriter(mockPitch, 20, 300);
  
  // Load mock pitch data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const data = await import('../mock/pitches.json');
        setMockPitch(data.pitches[0]);
      } catch (error) {
        console.error('Failed to load mock pitch data:', error);
      }
    };
    
    if (isGenerating && !mockPitch) {
      loadMockData();
    }
  }, [isGenerating, mockPitch]);
  
  // Handle generation
  const handleGenerate = () => {
    setIsGenerating(true);
  };
  
  // Show confetti when typewriter completes
  useEffect(() => {
    if (isComplete && mockPitch) {
      setShowConfetti(true);
      setPitch(mockPitch);
      
      const timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isComplete, mockPitch, setPitch]);
  
  // Translations
  const translations = {
    en: {
      title: 'AI Pitch Coach',
      subtitle: 'Describe your business idea and let our AI craft a compelling pitch',
      ideaPlaceholder: 'Describe your business idea here (at least 20 characters)',
      generateButton: 'Generate Pitch',
      generatingText: 'Generating your perfect pitch...',
      continueButton: 'Continue',
      charactersNeeded: 'characters needed'
    },
    al: {
      title: 'Trajneri i AI për Prezantim',
      subtitle: 'Përshkruani idenë tuaj të biznesit dhe lëreni AI-në tonë të krijojë një prezantim bindës',
      ideaPlaceholder: 'Përshkruani idenë tuaj të biznesit këtu (të paktën 20 karaktere)',
      generateButton: 'Gjenero Prezantimin',
      generatingText: 'Duke gjeneruar prezantimin tuaj perfekt...',
      continueButton: 'Vazhdo',
      charactersNeeded: 'karaktere nevojiten'
    }
  };
  
  const text = translations[language];
  
  // Confetti effect
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 8 + 5;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const delay = Math.random() * 0.5;
          const color = [
            'bg-primary',
            'bg-green-500',
            'bg-blue-500',
            'bg-yellow-500',
            'bg-pink-500'
          ][Math.floor(Math.random() * 5)];
          
          return (
            <motion.div
              key={i}
              className={`absolute ${color} rounded-sm`}
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: '-20px',
              }}
              initial={{ y: -20 }}
              animate={{
                y: '100vh',
                rotate: Math.random() * 360,
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: animationDuration,
                delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      {renderConfetti()}
      
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-dark-800 rounded-xl p-6 shadow-lg h-full">
              <textarea
                id="ideaInput"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={text.ideaPlaceholder}
                className="w-full h-64 bg-dark-700 text-white rounded-lg p-4 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none mb-2"
                disabled={isGenerating}
              />
              
              <div className="flex justify-between text-sm text-gray-400 mb-6">
                <span>
                  {idea.length < 20 ? `${20 - idea.length} ${text.charactersNeeded}` : ''}
                </span>
                <span>{idea.length} / 500</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={idea.length < 20 || isGenerating}
                className={`
                  w-full flex items-center justify-center py-3 px-4
                  rounded-lg text-white font-medium
                  transition-all duration-200
                  ${
                    idea.length >= 20 && !isGenerating
                      ? 'bg-primary hover:bg-primary-dark'
                      : 'bg-gray-700 cursor-not-allowed'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    {text.generatingText}
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="mr-2" />
                    {text.generateButton}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Output Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-dark-800 rounded-xl p-6 shadow-lg h-full flex flex-col">
              <div className="flex-1 overflow-auto">
                {renderSkeleton()}
                
                {displayText && (
                  <div className="prose prose-invert prose-sm max-w-none">
                    {displayText.split('\n\n').map((paragraph, i) => {
                      // Check if paragraph is a header (starts with **)
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <motion.h3
                            key={i}
                            className="text-xl font-bold text-primary mb-4"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {paragraph.slice(2, -2)}
                          </motion.h3>
                        );
                      }
                      
                      return (
                        <motion.p
                          key={i}
                          className="mb-4"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {paragraph}
                        </motion.p>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/matches')}
                    className="flex items-center justify-center py-2 px-6 bg-primary rounded-lg text-white font-medium hover:bg-primary-dark transition-all duration-200"
                  >
                    {text.continueButton}
                    <ChevronRight size={18} className="ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PitchCoachScreen;