import React from 'react';
import { Home, PlusCircle, List, PiggyBank, PieChart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation({ current, onChange }) {
  // We use lucide-react icons instead of SVGs
  const navItems = [
    { id: 'dash', label: 'Home', icon: Home },
    { id: 'add', label: 'Add', icon: PlusCircle },
    { id: 'txs', label: 'Txns', icon: List },
    { id: 'bud', label: 'Budget', icon: PiggyBank },
    { id: 'rep', label: 'Report', icon: PieChart },
    { id: 'inv', label: 'Invest', icon: TrendingUp },
  ];

  return (
    <nav className="nav">
      {navItems.map(item => {
        const Icon = item.icon;
        const isOn = current === item.id;
        const isAdd = item.id === 'add';

        if (isAdd) {
           return (
             <motion.button 
               key={item.id} 
               className={`nb ${isOn ? 'on' : ''}`} 
               onClick={() => onChange(item.id)}
               whileTap={{ scale: 0.9 }}
               animate={{ y: [0, -3, 0] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             >
               <motion.div 
                 style={{ background: 'linear-gradient(135deg, var(--gold), var(--teal))', borderRadius: '50%', padding: '8px', color: '#0d0d1a', boxShadow: '0 4px 15px rgba(247,201,72, 0.4)' }}
                 whileHover={{ rotate: 90, scale: 1.1 }}
               >
                 <Icon size={24} strokeWidth={2} />
               </motion.div>
             </motion.button>
           );
        }

        return (
          <motion.button 
            key={item.id} 
            className={`nb ${isOn ? 'on' : ''}`} 
            onClick={() => onChange(item.id)}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={21} strokeWidth={isOn ? 2 : 1.7} />
            {item.label}
          </motion.button>
        );
      })}
    </nav>
  );
}
