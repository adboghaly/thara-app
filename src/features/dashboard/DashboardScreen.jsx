import React from 'react';
import { useStore } from '../../store/useStore';
import { curM, fmt, getMonthNameAr, getMonthNameEn } from '../../utils/format';
import TxRow from '../../components/TxRow';
import BudgetBar from '../../components/BudgetBar';
import AnimatedNumber from '../../components/AnimatedNumber';
import { Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardScreen({ openSettings, goSc }) {
  const { income, transactions, budgets, cats, name } = useStore();
  const m = curM();
  const txs = transactions.filter(t => t.date.startsWith(m));
  
  const eInc = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totInc = income + eInc;
  const spent = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const sav = txs.filter(t => t.category === 'save').reduce((s, t) => s + t.amount, 0);
  const rem = totInc - spent;
  
  const sc = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    sc[t.category] = (sc[t.category] || 0) + t.amount;
  });

  const pct = totInc > 0 ? Math.round((spent / totInc) * 100) : 0;
  const heroMsg = rem >= 0 ? `${pct}% spent — ${pct}% أُنفق` : '⚠️ Over budget! / تجاوزت الميزانية!';
  const heroBackground = rem < 0 
    ? 'linear-gradient(135deg, rgba(255,79,123,.12), rgba(255,79,123,.06), rgba(183,148,244,.08))'
    : 'linear-gradient(135deg, rgba(183,148,244,.12) 0%, rgba(96,165,250,.08) 50%, rgba(0,229,192,.1) 100%)';

  const d = new Date();
  const ml = `${getMonthNameAr()} ${d.getFullYear()} — ${getMonthNameEn()}`;
  const period = `${getMonthNameEn()} ${d.getFullYear()}`;

  // Alerts logic
  const als = [];
  cats.forEach(c => {
    const lim = budgets[c.id] || 0;
    const sp = sc[c.id] || 0;
    if (lim > 0 && sp > lim) {
      const ov = Math.round(((sp - lim) / lim) * 100);
      als.push({ t: 'danger', icon: '⚠️', txt: `"${c.en}/${c.ar}": Over by ${ov}% — Spent ${fmt(sp)} of ${fmt(lim)} limit / تجاوزت بنسبة ${ov}%` });
    }
  });

  const sl = budgets['save'] || 0;
  const ss = sc['save'] || 0;
  if (sl > 0 && ss < sl * 0.5) {
    als.push({ t: 'warn', icon: '💡', txt: `Savings: Only ${fmt(ss)} of ${fmt(sl)} target / الادخار ${Math.round((ss/sl)*100)}% من الهدف فقط — الادخار ليس اختيارياً!` });
  }

  const dTxs = txs.filter(t => t.category === 'dining');
  if (dTxs.length >= 6) {
    const tot = dTxs.reduce((s, t) => s + t.amount, 0);
    als.push({ t: 'warn', icon: '🔍', txt: `Leak detected: ${dTxs.length} dining visits = ${fmt(tot)} EGP/month / تسرب: ${dTxs.length} مرة مطعم = ${fmt(tot)} جنيه` });
  }
  
  if (txs.length > 0 && (new Date() - new Date(txs[0].date + 'T00:00:00')) > 172800000) {
    als.push({ t: 'info', icon: '🔔', txt: 'No transactions logged in 48h — هل فاتك تسجيل معاملة؟' });
  }

  // Advice logic
  const tips = [];
  if (income) {
    const sp = Math.round((sav / income) * 100);
    if (sp < 10) tips.push(`💎 Savings rate: ${sp}% — target 20%+ | نسبة الادخار ${sp}% — الهدف 20%+. ابدأ بـ 5% واستمر.`);
    if (!sc['inv']) tips.push(`📈 No investment this month | لم تستثمر هذا الشهر — حتى ${fmt(income * 0.05)} جنيه (5%) في الذهب أو صناديق الأموال يُحدث فرقاً كبيراً على المدى البعيد.`);
    const disc = (sc['dining'] || 0) + (sc['shop'] || 0) + (sc['subs'] || 0);
    if (disc / income > 0.25) tips.push(`🎯 Discretionary spending: ${Math.round((disc / income) * 100)}% of income | الإنفاق التقديري ${Math.round((disc / income) * 100)}% من دخلك — راجع اشتراكاتك الشهرية.`);
  }

  const [isAlertsOpen, setIsAlertsOpen] = React.useState(false);
  const [tipToDisplay, setTipToDisplay] = React.useState(null);
  React.useEffect(() => {
    if (tips.length > 0) setTipToDisplay(tips[Math.floor(Math.random() * tips.length)]);
  }, [tips.length]);

  return (
    <div className="sc on" id="sc-dash" style={{ display: 'flex' }}>
      <div className="hdr" style={{ paddingBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="htitle">مرحباً {name || ''} 👋</motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hsub">{ml}</motion.div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {als.length > 0 && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="chip chip-r"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsAlertsOpen(true)}
              >
                ⚠️ {als.length}
              </motion.div>
            )}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 90 }}
              onClick={openSettings}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--glass2)', border: '0.5px solid var(--border)', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Settings size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div 
        className="tharwa-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="content">
          <div className="title-row">
            <span className="title">ثروة CARD</span>
            <svg width="34" height="22" viewBox="0 0 34 22" fill="none"><circle cx="11" cy="11" r="11" fill="#fff" fillOpacity="0.5"/><circle cx="23" cy="11" r="11" fill="#fff" fillOpacity="0.5"/></svg>
          </div>
          
          <div style={{ textAlign: 'left', direction: 'ltr' }}>
            <div className="balance-label" style={{ textAlign: 'right', direction: 'rtl' }}>الرصيد الإجمالي</div>
            <div className="balance glow-gold"><sup>EGP</sup><AnimatedNumber value={rem} /></div>
          </div>

          <div className="bottom-row">
            <div style={{ textAlign: 'left' }}>
              <div className="holder-label">Cardholder</div>
              <div className="holder-name">{name || 'Thara Member'}</div>
            </div>
            <div className="date">12/28</div>
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '0 16px', marginBottom: '4px' }}>
        {als.slice(0, 3).map((a, i) => (
          <div key={i} className={`al ${a.t}`}>
            <span className="al-icon">{a.icon}</span>
            <span className="al-text">{a.txt}</span>
          </div>
        ))}
      </div>

      {tipToDisplay && (
        <motion.div className="adv" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <div className="adv-label">💡 Financial Tip / نصيحة مخصصة</div>
          <div className="adv-text">{tipToDisplay}</div>
        </motion.div>
      )}

      <motion.div className="card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="ch">
          <span className="ct">Budget Overview</span>
          <span className="tip" title="% spent per category">?</span>
        </div>
        <div>
          {cats.some(c => (budgets[c.id] || 0) > 0 || (sc[c.id] || 0) > 0) ? (
            cats.map(c => (
              <BudgetBar key={c.id} label={`${c.en} / ${c.ar}`} iconId={c.id} color={c.c} spent={sc[c.id] || 0} limit={budgets[c.id] || 0} />
            ))
          ) : (
            <div className="empty">
              <div className="empty-icon">📊</div>
              <div className="empty-text">No budgets set yet<br />اضبط الميزانية أولاً</div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="ch">
          <span className="ct">Recent Transactions</span>
          <span style={{ fontSize: '11px', color: 'var(--gold)', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }} onClick={() => goSc('txs')}>View all →</span>
        </div>
        <div>
          {txs.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📭</div>
              <div className="empty-text">No transactions yet<br />لا توجد معاملات بعد</div>
            </div>
          ) : (
            txs.slice(0, 5).map(tx => <TxRow key={tx.id} tx={tx} />)
          )}
        </div>
      </motion.div>

      {/* ALERTS MODAL */}
      {isAlertsOpen && (
        <div className="moverlay on" style={{ display: 'flex' }}>
          <motion.div className="modal" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="mhandle" onClick={() => setIsAlertsOpen(false)}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div className="mtitle" style={{ marginBottom: 0 }}>الإشعارات / Notifications</div>
              <div className="chip chip-r">⚠️ {als.length}</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {als.map((a, i) => (
                <div key={i} className={`al ${a.t}`} style={{ animation: 'none', marginBottom: 0 }}>
                  <span className="al-icon">{a.icon}</span>
                  <span className="al-text">{a.txt}</span>
                </div>
              ))}
            </div>

            <button className="btns" onClick={() => setIsAlertsOpen(false)} style={{ marginTop: '20px' }}>
              Back / رجوع
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
