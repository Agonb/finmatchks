import React from 'react';
import { motion } from 'framer-motion';

export interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
}

interface ChatBubbleProps {
  message: Message;
  index: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.1
      }}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-dark-700 text-white rounded-tl-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-primary-light' : 'text-gray-400'}`}>
          {message.timestamp}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;