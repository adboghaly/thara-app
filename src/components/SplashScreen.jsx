import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'var(--bg)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <motion.img 
        src="/thara_logo.png"
        alt="Thara Logo"
        style={{ width: '120px', height: '120px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      />
      <motion.div
        style={{
          marginTop: '24px', fontSize: '28px', fontWeight: '800',
          background: 'linear-gradient(90deg, #f7c948 0%, #00e5c0 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: "'Inter', 'Cairo', sans-serif", letterSpacing: '2px'
        }}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        THARA
      </motion.div>
      <motion.div
        style={{ color: 'var(--text2)', marginTop: '8px', fontSize: '14px', letterSpacing: '1px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Premium Wealth Management
      </motion.div>
    </motion.div>
  );
}
