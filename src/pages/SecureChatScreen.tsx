import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, AlertCircle } from 'lucide-react';
import ChatBubble, { Message } from '../components/ChatBubble';
import VaultCard from '../components/VaultCard';
import Toast from '../components/Toast';
import { useAppContext } from '../context/AppContext';

const SecureChatScreen: React.FC = () => {
  const { language } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load mock chat data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const data = await import('../mock/chatDemo.json');
        setMessages(data.messages);
      } catch (error) {
        console.error('Failed to load mock chat data:', error);
      }
    };
    
    loadMockData();
  }, []);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    setShowSensitiveWarning(false);
    
    // Auto-reply after a short delay
    setTimeout(() => {
      const autoReply: Message = {
        id: `other-${Date.now()}`,
        sender: 'other',
        text: language === 'en'
          ? "Thanks for sharing. I'll review this information and get back to you soon."
          : "Faleminderit për ndarjen. Do ta shqyrtoj këtë informacion dhe do t'ju kthej përgjigje së shpejti.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, autoReply]);
    }, 1500);
  };
  
  // Check for sensitive information
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    
    // Check for sensitive information patterns
    const sensitivePattern = /\b(iban|ibn|account)\b/i;
    setShowSensitiveWarning(sensitivePattern.test(value));
  };
  
  // Handle share link
  const handleShareLink = () => {
    navigator.clipboard.writeText("https://vault.finfund.ks/share/123");
    setLinkCopied(true);
    
    setToast({
      show: true,
      message: language === 'en' 
        ? 'Secure link copied to clipboard!' 
        : 'Lidhja e sigurt u kopjua në clipboard!'
    });
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };
  
  // Translations
  const translations = {
    en: {
      title: 'Secure Chat',
      inputPlaceholder: 'Type your message...',
      sendButton: 'Send',
      sensitiveWarning: 'Sensitive info detected. Share privately?',
      metadataStrip: 'Metadata removed'
    },
    al: {
      title: 'Bisedë e Sigurt',
      inputPlaceholder: 'Shkruani mesazhin tuaj...',
      sendButton: 'Dërgo',
      sensitiveWarning: 'Informacion i ndjeshëm i zbuluar. Ndani privatisht?',
      metadataStrip: 'Metadata u hoq'
    }
  };
  
  const text = translations[language];
  
  return (
    <div className="min-h-screen bg-dark-900 py-4 px-4">
      <div className="max-w-container mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-white">{text.title}</h1>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat Area */}
          <motion.div
            className="flex-1 bg-dark-800 rounded-xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Metadata Badge */}
            <div className="bg-dark-700 px-4 py-2 flex items-center">
              <div className="flex-1 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-400">{text.metadataStrip}</span>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {messages.map((message, index) => (
                  <ChatBubble key={message.id} message={message} index={index} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-700 p-4">
              <div className="relative">
                {showSensitiveWarning && (
                  <div className="absolute -top-10 left-0 right-0 bg-red-900 text-white text-sm p-2 rounded-md flex items-center">
                    <AlertCircle size={16} className="mr-2 text-red-400" />
                    {text.sensitiveWarning}
                  </div>
                )}
                
                <div className="flex">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleMessageChange}
                    placeholder={text.inputPlaceholder}
                    className="flex-1 bg-dark-700 rounded-l-lg px-4 py-2 text-white border border-gray-700 focus:outline-none focus:border-primary"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="bg-primary text-white px-4 py-2 rounded-r-lg focus:outline-none flex items-center justify-center"
                    disabled={!newMessage.trim()}
                  >
                    <SendHorizonal size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Vault Card */}
          <motion.div
            className="lg:w-1/3 bg-dark-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VaultCard onShareLink={handleShareLink} copied={linkCopied} />
          </motion.div>
        </div>
      </div>
      
      {/* Toast */}
      {toast?.show && (
        <Toast
          message={toast.message}
          type="success"
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SecureChatScreen;