import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

const ALLOCS = [
  {k:'ess',ar:'الأساسيات',en:'Essentials',icon:'🏠',hint:'إيجار، طعام، مواصلات... | Rent, food, transport...'},
  {k:'sav',ar:'الادخار',en:'Savings',icon:'💰',hint:'اجعله إلزامياً! | Make it mandatory!'},
  {k:'inv',ar:'الاستثمار',en:'Investment',icon:'📈',hint:'ذهب، صناديق، أسهم | Gold, funds, stocks'},
  {k:'disc',ar:'الترفيه',en:'Discretionary',icon:'🎯',hint:'مطاعم، تسوق، اشتراكات | Dining, shopping, subs'},
];

export default function SetupScreen() {
  const { alloc, updateAlloc, doSetup } = useStore();
  const [inc, setInc] = useState('');
  const [email, setEmail] = useState('');

  const totalAlloc = Object.values(alloc).reduce((a, b) => a + b, 0);

  const handleStart = () => {
    const incomeNum = parseInt(inc);
    if (!incomeNum || incomeNum < 1) {
      alert('Enter income / أدخل الدخل');
      return;
    }
    if (totalAlloc !== 100) {
      alert('Total must = 100% / المجموع يجب = 100%');
      return;
    }
    doSetup(incomeNum, email);
  };

  return (
    <div id="setup" className="on" style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', justifyContent: 'center', padding: '32px 20px', position: 'relative', zIndex: 1 }}>
      <div className="logo">
        <div className="logo-mark">🪙</div>
        <div className="logo-name">Thara</div>
        <div className="logo-ar">ثـروة</div>
        <div className="logo-sub">Financial Control System — نظام تحكم مالي</div>
      </div>

      <div className="scard">
        <div className="fg-wrap">
          <div className="flabel">
            💰 Monthly Income / الدخل الشهري
          </div>
          <input className="fi fi-big" type="number" value={inc} onChange={e => setInc(e.target.value)} placeholder="0" inputMode="numeric" />
        </div>

        <div className="flabel" style={{ marginBottom: '10px' }}>
          Budget Allocation / توزيع الميزانية
        </div>
        <div id="arows">
          {ALLOCS.map(a => (
            <div className="arow" key={a.k}>
              <span className="arow-icon">{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: 'var(--text)' }}>{a.en} / {a.ar}</div>
                <div className="arow-hint">{a.hint}</div>
              </div>
              <input className="ainput" type="number" min="0" max="100" value={alloc[a.k]} onChange={e => updateAlloc(a.k, e.target.value)} />
              <span className="pct-s">%</span>
            </div>
          ))}
        </div>
        <div id="atotal" style={{ textAlign: 'center', fontSize: '12px', padding: '8px 0', fontFamily: "'Space Grotesk', monospace", color: totalAlloc === 100 ? 'var(--teal)' : 'var(--red)' }}>
          Total / المجموع: {totalAlloc}%
        </div>
      </div>

      <div className="scard">
        <div className="fg-wrap" style={{ marginBottom: 0 }}>
          <div className="flabel">
            📧 Email for Monthly Reports / بريد التقارير
          </div>
          <input className="fi" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" dir="ltr" />
        </div>
      </div>

      <button className="btnp" onClick={handleStart}>🚀 Start Tracking / ابدأ التتبع</button>
    </div>
  );
}
