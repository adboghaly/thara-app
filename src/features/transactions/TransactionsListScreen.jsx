import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import TxRow from '../../components/TxRow';

export default function TransactionsListScreen() {
  const { transactions } = useStore();
  
  const now = new Date();
  const mons = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const pMonths = Array.from({length: 6}).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const v = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    return { v, l: mons[d.getMonth()] + ' ' + d.getFullYear() };
  });

  const [selMonth, setSelMonth] = useState(pMonths[0].v);
  const [selType, setSelType] = useState('all');

  let filtered = transactions.filter(t => t.date.startsWith(selMonth));
  if (selType !== 'all') {
    filtered = filtered.filter(t => t.type === selType);
  }

  return (
    <div className="sc on" id="sc-txs" style={{ display: 'flex' }}>
      <div className="hdr">
        <div className="htitle">Transactions</div>
        <div className="hsub">كل معاملاتك</div>
      </div>
      <div style={{ padding: '0 16px', marginBottom: '12px', display: 'flex', gap: '8px' }}>
        <select className="fsel" value={selMonth} onChange={e => setSelMonth(e.target.value)} style={{ flex: 1, padding: '10px 12px', fontSize: '13px' }}>
          {pMonths.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
        </select>
        <select className="fsel" value={selType} onChange={e => setSelType(e.target.value)} style={{ width: '100px', padding: '10px 12px', fontSize: '13px' }}>
          <option value="all">All / الكل</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div id="tx-list">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📭</div>
            <div className="empty-text">No transactions / لا توجد معاملات</div>
          </div>
        ) : (
          filtered.map(t => (
            <div key={t.id} style={{ padding: '0 16px' }}>
              <TxRow tx={t} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
