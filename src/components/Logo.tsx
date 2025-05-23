import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', animated = true }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  // SVG path animation
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <div className={`${sizes[size]} flex items-center`}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path
          d="M20 10h20v30h-20z"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d="M50 10h20M50 25h15M50 40h20"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d="M80 10h20v30h-20z"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d="M110 10h20v30h-20z"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d="M140 10h20v30M140 25h15M140 40h20"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d="M170 10h20v30h-20z"
          stroke="#7E3EFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default Logo;