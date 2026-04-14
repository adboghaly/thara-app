import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { curM, fmt } from '../../utils/format';
import Icon from '../../components/Icon';

export default function BudgetScreen() {
  const { cats, budgets, transactions, saveBudget } = useStore();
  const m = curM();
  const txs = transactions.filter(t => t.date.startsWith(m));
  
  const sc = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    sc[t.category] = (sc[t.category] || 0) + t.amount;
  });

  const [editCat, setEditCat] = useState(null);
  const [bmVal, setBmVal] = useState('');

  const grps = [
    { l: 'Essentials / الأساسيات 🏠', gCats: cats.filter(c => c.group === 'ess') },
    { l: 'Variable / المتغير 🛍️', gCats: cats.filter(c => c.group === 'var') },
    { l: 'Financial / المالي 💰', gCats: cats.filter(c => c.group === 'fin') },
  ];

  const handleOpenMod = (c) => {
    setEditCat(c);
    setBmVal(budgets[c.id] || 0);
  };

  const handleSave = () => {
    if (editCat && bmVal !== '') {
      saveBudget(editCat.id, bmVal);
      setEditCat(null);
    }
  };

  return (
    <div className="sc on" id="sc-bud" style={{ display: 'flex' }}>
      <div className="hdr">
        <div className="htitle">Budget Control</div>
        <div className="hsub">تحكم في حدود الإنفاق</div>
      </div>
      <div id="bud-content">
        {grps.map(g => (
          <React.Fragment key={g.l}>
            <div className="slabel">{g.l}</div>
            {g.gCats.map(c => {
              const lim = budgets[c.id] || 0;
              const sp = sc[c.id] || 0;
              const p = lim > 0 ? Math.round((sp / lim) * 100) : 0;
              const cls = p >= 100 ? 'fr' : p >= 80 ? 'fa' : 'ft';
              const rem = lim - sp;
              
              return (
                <div key={c.id} className="brow" onClick={() => handleOpenMod(c)}>
                  <div className="brow-icon" style={{ background: `${c.c}18`, color: c.c }}>
                    <Icon name={c.id} size={22} />
                  </div>
                  <div className="brow-body">
                    <div className="brow-name">{c.en} / {c.ar}</div>
                    <div style={{ margin: '6px 0 3px' }}>
                      <div className="prg-track"><div className={`prg-fill ${cls}`} style={{ width: `${Math.min(p, 100)}%` }}></div></div>
                    </div>
                    <div style={{ fontSize: '11px', color: p >= 100 ? 'var(--red)' : p >= 80 ? 'var(--amber)' : 'var(--text3)', fontFamily: "'Space Grotesk', monospace" }}>
                      {p}% used
                    </div>
                  </div>
                  <div className="brow-right">
                    <div className="brow-sp" style={{ color: p >= 100 ? 'var(--red)' : 'var(--text)' }}>{fmt(sp)}</div>
                    <div className="brow-lim">/ {fmt(lim)}</div>
                    <div style={{ fontSize: '11px', color: rem >= 0 ? 'var(--teal)' : 'var(--red)', marginTop: '2px', fontFamily: "'Space Grotesk', monospace" }}>
                      {rem >= 0 ? '↓ ' + fmt(rem) : '↑ ' + fmt(-rem)}
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {editCat && (
        <div className="moverlay on" style={{ display: 'flex' }}>
          <div className="modal">
            <div className="mhandle"></div>
            <div className="mtitle">Edit Budget: {editCat.en} / تعديل الميزانية</div>
            <div className="fg-wrap">
              <div className="flabel">Monthly Limit (EGP) / الحد الشهري</div>
              <input className="fi fi-big" type="number" value={bmVal} onChange={e => setBmVal(e.target.value)} inputMode="numeric" style={{ fontSize: '28px' }} autoFocus />
            </div>
            <button className="btnp" onClick={handleSave}>Save / حفظ</button>
            <button className="btns" onClick={() => setEditCat(null)}>Cancel / إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
}
