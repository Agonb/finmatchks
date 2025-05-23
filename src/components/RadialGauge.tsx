import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RadialGaugeProps {
  score: number;
  size?: number;
  thickness?: number;
  duration?: number;
}

const RadialGauge: React.FC<RadialGaugeProps> = ({ 
  score,
  size = 200,
  thickness = 12,
  duration = 1.2
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  // Animate the score value
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animateScore = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setDisplayScore(Math.floor(progress * score));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateScore);
      }
    };
    
    animationFrame = requestAnimationFrame(animateScore);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [score, duration]);
  
  // Calculate the circumference and stroke dash values
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  
  // Calculate color based on score
  const getColor = () => {
    if (displayScore >= 90) return '#10B981'; // success
    if (displayScore >= 70) return '#7E3EFF'; // primary
    if (displayScore >= 50) return '#F59E0B'; // warning
    return '#EF4444'; // error
  };
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#2D2D2D"
          strokeWidth={thickness}
        />
        
        {/* Foreground circle (progress) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getColor()}
          strokeWidth={thickness}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration, ease: "easeOut" }}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-white">{displayScore}</span>
          <span className="text-xl text-gray-400">/100</span>
        </div>
        <span className="text-sm text-gray-300 mt-1">Trust Score</span>
      </div>
    </div>
  );
};

export default RadialGauge;