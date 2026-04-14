import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, PlusCircle, X } from 'lucide-react';

export default function InvestmentsScreen() {
  const { investments, addInvestment } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInvName, setNewInvName] = useState('');
  const [newInvAmount, setNewInvAmount] = useState('');

  const currentInvestments = investments || [];

  const handleAddInvestment = (e) => {
    e.preventDefault();
    if (!newInvName || !newInvAmount) return;
    addInvestment({
      name: newInvName,
      amount: Number(newInvAmount),
      color: '#00e5c0' // Using teal as default for investments
    });
    setNewInvName('');
    setNewInvAmount('');
    setShowAddModal(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="sc on" id="sc-inv" style={{ display: 'flex' }}>
      <div className="hdr" style={{ paddingBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="htitle">الاستثمارات 📈</motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hsub">تتبع قوة مدخراتك وأرباحك الخارجية</motion.div>
          </div>
        </div>
      </div>

      <motion.div className="card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ flex: 1 }}>
            <div className="ct" style={{ marginBottom: '4px' }}>أضف محفظة جديدة</div>
            <div style={{ fontSize: '12px', color: 'var(--text2)' }}>Thndr, Binance, الذهب، وغيرها...</div>
         </div>
         <button className="btnp" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowAddModal(true)}>
           <PlusCircle size={20} />
         </button>
      </motion.div>

      <div style={{ padding: '0 16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {currentInvestments.length === 0 ? (
           <div className="empty" style={{ width: '100%' }}>
             <div className="empty-icon"><TrendingUp size={42} style={{ margin: '0 auto' }} /></div>
             <div className="empty-text">لا توجد محفظات استثمارية مضافة.<br/>ابدأ بإضافة أرصدتك الآن لربطها بثروتك!</div>
           </div>
        ) : (
           currentInvestments.map((inv, idx) => (
             <motion.div 
               key={inv.id} 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ delay: 0.3 + (idx * 0.1) }}
               className="card"
               style={{ width: '100%', margin: '0 0 12px 0', borderLeft: `3px solid ${inv.color || 'var(--gold)'}` }}
             >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '18px', color: inv.color || 'var(--gold)' }}>
                         {inv.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                         <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{inv.name}</div>
                         <div style={{ fontSize: '11px', color: 'var(--text3)' }}>رصيد المحفظة</div>
                      </div>
                   </div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: "'Space Grotesk', monospace" }}>
                     {formatCurrency(inv.amount)}
                   </div>
                </div>
             </motion.div>
           ))
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="moverlay on" style={{ display: 'flex' }}>
            <motion.div className="modal" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <div className="mhandle" onClick={() => setShowAddModal(false)}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div className="mtitle" style={{ marginBottom: 0 }}>إضافة استثمار جديد</div>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAddInvestment}>
                 <div className="fg-wrap">
                    <label className="flabel">اسم المنصة أو الأصل (مثال: ذهب، Thndr)</label>
                    <input type="text" className="fi" value={newInvName} onChange={(e) => setNewInvName(e.target.value)} required />
                 </div>
                 <div className="fg-wrap">
                    <label className="flabel">الرصيد الحالي (ج.م)</label>
                    <input type="number" className="fi" value={newInvAmount} onChange={(e) => setNewInvAmount(e.target.value)} required />
                 </div>
                 <button type="submit" className="btnp" style={{ marginTop: '20px' }}>حفظ الاستثمار</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
