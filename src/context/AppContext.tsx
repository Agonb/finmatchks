import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  language: 'en' | 'al';
  setLanguage: (lang: 'en' | 'al') => void;
  role: 'founder' | 'investor' | 'bank' | null;
  setRole: (role: 'founder' | 'investor' | 'bank') => void;
  idea: string;
  setIdea: (idea: string) => void;
  pitch: string;
  setPitch: (pitch: string) => void;
  userProfile: {
    trustScore: number;
    sex: string;
    badges: string[];
  };
}

const defaultState: AppContextType = {
  language: 'en',
  setLanguage: () => {},
  role: null,
  setRole: () => {},
  idea: '',
  setIdea: () => {},
  pitch: '',
  setPitch: () => {},
  userProfile: {
    trustScore: 91,
    sex: 'female',
    badges: ['KYC Verified', 'Encrypted Vault', '4 Peer Reviews']
  }
};

const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'al'>('en');
  const [role, setRole] = useState<'founder' | 'investor' | 'bank' | null>(null);
  const [idea, setIdea] = useState('');
  const [pitch, setPitch] = useState('');
  const [userProfile] = useState({
    trustScore: 91,
    sex: 'female',
    badges: ['KYC Verified', 'Encrypted Vault', '4 Peer Reviews']
  });

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      role, 
      setRole, 
      idea, 
      setIdea, 
      pitch, 
      setPitch,
      userProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};