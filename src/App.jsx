import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import SetupScreen from './features/setup/SetupScreen';
import DashboardScreen from './features/dashboard/DashboardScreen';
import AddTransactionScreen from './features/transactions/AddTransactionScreen';
import TransactionsListScreen from './features/transactions/TransactionsListScreen';
import BudgetScreen from './features/budget/BudgetScreen';
import ReportScreen from './features/reports/ReportScreen';
import SettingsModal from './features/settings/SettingsModal';
import Navigation from './components/Navigation';
import SplashScreen from './components/SplashScreen';

const variants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.2 } }
};

export default function App() {
  const { setup, toastMessage } = useStore();
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('dash');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  if (showSplash) {
    return (
      <AnimatePresence mode="wait">
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      </AnimatePresence>
    );
  }

  if (!setup) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="setup" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <SetupScreen />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div id="app">
      <main style={{ paddingBottom: '95px', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {currentScreen === 'dash' && (
            <motion.div key="dash" variants={variants} initial="initial" animate="animate" exit="exit" style={{width:'100%', display:'flex'}}>
              <DashboardScreen openSettings={() => setIsSettingsOpen(true)} goSc={setCurrentScreen} />
            </motion.div>
          )}
          {currentScreen === 'add' && (
            <motion.div key="add" variants={variants} initial="initial" animate="animate" exit="exit" style={{width:'100%', display:'flex'}}>
              <AddTransactionScreen goSc={setCurrentScreen} />
            </motion.div>
          )}
          {currentScreen === 'txs' && (
             <motion.div key="txs" variants={variants} initial="initial" animate="animate" exit="exit" style={{width:'100%', display:'flex'}}>
              <TransactionsListScreen />
            </motion.div>
          )}
          {currentScreen === 'bud' && (
             <motion.div key="bud" variants={variants} initial="initial" animate="animate" exit="exit" style={{width:'100%', display:'flex'}}>
              <BudgetScreen />
            </motion.div>
          )}
          {currentScreen === 'rep' && (
             <motion.div key="rep" variants={variants} initial="initial" animate="animate" exit="exit" style={{width:'100%', display:'flex'}}>
              <ReportScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation current={currentScreen} onChange={setCurrentScreen} />
      
      <AnimatePresence>
        {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
      </AnimatePresence>
      
      <div id="toast" className={toastMessage ? 'show' : ''}>{toastMessage}</div>
    </div>
  );
}
