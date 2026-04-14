import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

export default function AddTransactionScreen({ goSc }) {
  const { cats, addTransaction } = useStore();
  const [type, setType] = useState('exp');
  const [cat, setCat] = useState('food');
  const [amt, setAmt] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleSave = () => {
    const amount = parseFloat(amt);
    if (!amount || amount <= 0) {
      alert('Enter valid amount / أدخل مبلغاً صحيحاً');
      return;
    }

    addTransaction({
      id: Date.now(),
      amount: amount,
      type: type === 'exp' ? 'expense' : 'income',
      category: type === 'exp' ? cat : 'income',
      date: date || new Date().toISOString().split('T')[0],
      note: note,
    });

    setAmt('');
    setNote('');
    goSc('dash');
  };

  return (
    <div className="sc on" id="sc-add" style={{ display: 'flex' }}>
      <div className="hdr">
        <div className="htitle">New Transaction</div>
        <div className="hsub">سجّل معاملتك الجديدة</div>
      </div>
      <div className="fsec">
        <div className="ttgl">
          <div className={`tbtn ${type === 'exp' ? 'aexp' : ''}`} onClick={() => setType('exp')}>📤 Expense / مصروف</div>
          <div className={`tbtn ${type === 'inc' ? 'ainc' : ''}`} onClick={() => setType('inc')}>📥 Income / دخل</div>
        </div>
        
        <div className="fg-wrap">
          <div className="flabel">Amount / المبلغ <span className="tip" title="بالجنيه المصري | Egyptian Pound (EGP)">?</span></div>
          <input className="fi fi-big" type="number" value={amt} onChange={e => setAmt(e.target.value)} placeholder="0.00" inputMode="decimal" autoFocus />
        </div>
        
        {type === 'exp' && (
          <div className="fg-wrap">
            <div className="flabel">Category / الفئة <span className="tip" title="اختر الفئة الأقرب لطبيعة المصروف | Choose the closest category">?</span></div>
            <div className="cg">
              {cats.map(c => (
                <div key={c.id} className={`cc ${cat === c.id ? 'sel' : ''}`} onClick={() => setCat(c.id)}>
                  <span className="cc-icon">{c.icon}</span>
                  <span>{c.en}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="fg-wrap">
          <div className="flabel">Date / التاريخ <span className="tip" title="الافتراضي اليوم | Default is today">?</span></div>
          <input className="fi" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        
        <div className="fg-wrap">
          <div className="flabel">Note / ملاحظة <span style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: 400 }}>(optional)</span></div>
          <input className="fi" type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Lunch with colleagues" />
        </div>
        
        <button className="btnp" onClick={handleSave}>✓ Save Transaction / حفظ</button>
      </div>
    </div>
  );
}
