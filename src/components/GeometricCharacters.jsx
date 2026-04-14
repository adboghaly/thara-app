import React from 'react';
import { motion, useAnimation } from 'framer-motion';

const GeometricCharacters = ({ mousePosition, activeInput, isPasswordVisible }) => {
  const { x, y } = mousePosition;
  const eyeX = typeof window !== 'undefined' ? (x / window.innerWidth - 0.5) * 20 : 0;
  const eyeY = typeof window !== 'undefined' ? (y / window.innerHeight - 0.5) * 20 : 0;

  const getCurrentState = () => {
    if (activeInput === 'password' && !isPasswordVisible) return 'passwordHidden';
    if (activeInput === 'password' && isPasswordVisible) return 'password';
    if (activeInput === 'name' || activeInput === 'email' || activeInput === 'income') return 'email';
    return 'idle';
  };

  const purpleEyeVariant = {
    idle: { x: eyeX, y: eyeY },
    email: { x: -8, y: 15 },
    password: { x: 5, y: -5, scaleY: 1.2 },
    passwordHidden: { x: 0, y: 0, scaleY: 0.1 }
  };

  const yellowEyeVariant = {
    idle: { x: eyeX * 1.5, y: eyeY * 1.5 },
    email: { x: -12, y: 20 },
    password: { x: -5, y: -5, scaleX: 1.2 },
    passwordHidden: { x: 0, y: 0, scaleY: 0.1 }
  };

  const orangeEyeVariant = {
    idle: { x: eyeX * 1.2, y: eyeY * 1.2 },
    email: { x: -10, y: 18 },
    password: { x: 0, y: -8, scale: 1.1 },
    passwordHidden: { x: 0, y: 0, scaleY: 0.1 }
  };

  const navyEyeVariant = {
    idle: { x: eyeX * 0.8, y: eyeY * 0.8 },
    email: { x: -5, y: 10 },
    password: { x: 5, y: 5 },
    passwordHidden: { x: 0, y: 0, scaleX: 0.1 }
  };

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };

  return (
    <div style={{ width: '256px', height: '200px', position: 'relative', margin: '0 auto', transform: 'scale(1.4)', transformOrigin: 'center' }}>
      {/* Purple Form */}
      <motion.div
        style={{
          position: 'absolute', left: '16px', bottom: '16px',
          width: '64px', height: '144px',
          backgroundColor: '#5B2D8E',
          borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
        variants={floatingVariants}
        animate="animate"
        custom={0}
      >
        <motion.div animate={getCurrentState()} variants={purpleEyeVariant} style={{ position: 'relative', width: '30px', height: '20px' }}>
          <div style={{ position: 'absolute', left: '-4px', top: '0', width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '3px', left: '3px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', right: '-4px', top: '0', width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '3px', left: '3px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '8px', top: '14px', width: '14px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }} />
        </motion.div>
      </motion.div>

      {/* Yellow Form */}
      <motion.div
        style={{
          position: 'absolute', right: '24px', bottom: '16px',
          width: '56px', height: '112px',
          backgroundColor: '#FFD166',
          borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
          display: 'flex', justifyContent: 'center', paddingTop: '20px'
        }}
        variants={floatingVariants}
        animate="animate"
        custom={1}
      >
        <motion.div animate={getCurrentState()} variants={yellowEyeVariant} style={{ position: 'relative', width: '24px', height: '16px' }}>
          <div style={{ position: 'absolute', left: '-2px', top: '0', width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '5px', height: '5px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '2px', left: '2px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', right: '-2px', top: '0', width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '5px', height: '5px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '2px', left: '2px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '8px', top: '12px', width: '8px', height: '2px', backgroundColor: '#1A1A2E', borderRadius: '2px' }} />
        </motion.div>
      </motion.div>

      {/* Dark Navy Form */}
      <motion.div
        style={{
          position: 'absolute', left: '90px', bottom: '16px',
          width: '48px', height: '80px',
          backgroundColor: '#1A1A2E',
          borderRadius: '12px', zIndex: 10,
          display: 'flex', justifyContent: 'center', paddingTop: '16px'
        }}
        variants={floatingVariants}
        animate="animate"
        custom={2}
      >
        <motion.div animate={getCurrentState()} variants={navyEyeVariant} style={{ position: 'relative', width: '20px', height: '16px' }}>
          <div style={{ position: 'absolute', left: '-2px', top: '2px', width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%', top: '2px', left: '2px' }} />
          </div>
          <div style={{ position: 'absolute', right: '-2px', top: '2px', width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%', top: '2px', left: '2px' }} />
          </div>
          <div style={{ position: 'absolute', left: '6px', top: '12px', width: '8px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }} />
        </motion.div>
      </motion.div>

      {/* Orange Form (Front) */}
      <motion.div
        style={{
          position: 'absolute', left: '48px', bottom: '0',
          width: '88px', height: '56px',
          backgroundColor: '#FF6B35',
          borderTopLeftRadius: '44px', borderTopRightRadius: '44px',
          zIndex: 20, boxShadow: '0 10px 20px rgba(255, 107, 53, 0.2)',
          display: 'flex', justifyContent: 'center', paddingTop: '16px'
        }}
        variants={floatingVariants}
        animate="animate"
        custom={1.5}
      >
        <motion.div animate={getCurrentState()} variants={orangeEyeVariant} style={{ position: 'relative', width: '24px', height: '16px' }}>
          <div style={{ position: 'absolute', left: '-2px', top: '0', width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '2px', left: '2px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', right: '-2px', top: '0', width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: '#1A1A2E', borderRadius: '50%', top: '2px', left: '2px' }}>
                <div style={{ width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '1px', right: '1px' }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '8px', top: '10px', width: '8px', height: '2px', backgroundColor: '#1A1A2E', borderRadius: '2px' }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GeometricCharacters;
