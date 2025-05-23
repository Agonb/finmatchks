import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RoleSelector: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole, language } = useAppContext();
  
  const roles = [
    { id: 'founder', label: language === 'en' ? 'Founder' : 'Themelues' },
    { id: 'investor', label: language === 'en' ? 'Investor' : 'Investitor' },
    { id: 'bank', label: language === 'en' ? 'Bank Officer' : 'Zyrtar Banke' },
  ] as const;
  
  const handleRoleSelect = (selectedRole: 'founder' | 'investor' | 'bank') => {
    setRole(selectedRole);
    if (selectedRole === 'investor') {
      navigate('/investor');
    } else if (selectedRole === 'bank') {
      navigate('/bank');
    }
  };
  
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {roles.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRoleSelect(item.id)}
          className={`
            px-6 py-2 rounded-full text-sm font-medium
            transition-all duration-200
            ${role === item.id 
              ? 'bg-primary text-white shadow-lg shadow-primary/30' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
          `}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
};

export default RoleSelector;