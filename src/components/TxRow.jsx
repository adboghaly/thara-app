import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { fmt } from '../utils/format';
import Icon from './Icon';

export default function TxRow({ tx }) {
  const { cats } = useStore();
  const c = cats.find(cat => cat.id === tx.category) || { en: 'Income', ar: 'دخل', icon: '💵', c: '#00e5c0' };
  const d = new Date(tx.date + 'T00:00:00');
  const ds = d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });

  return (
    <motion.div 
      className="txi"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="txav" style={{ background: `${c.c}18`, color: c.c }}>
        <Icon name={c.id} size={22} />
      </div>
      <div className="txbody">
        <div className="txname">{tx.note || c.en + ' / ' + c.ar}</div>
        <div className="txmeta">{ds} · {tx.type === 'income' ? 'Income / دخل' : c.en + ' / ' + c.ar}</div>
      </div>
      <div className={`txamt ${tx.type === 'income' ? 'inc' : 'exp'}`}>
        {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
      </div>
    </motion.div>
  );
}
