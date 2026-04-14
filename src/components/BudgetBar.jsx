import React from 'react';
import { fmt } from '../utils/format';
import Icon from './Icon';

export default function BudgetBar({ label, iconId, color, spent, limit }) {
  if (!limit && !spent) return null;
  const p = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
  let cls = 'ft';
  if (p >= 100) cls = 'fr';
  else if (p >= 80) cls = 'fa';

  return (
    <div className="prg">
      <div className="prg-meta">
        <span className="prg-name">
          <div style={{ padding: '6px', borderRadius: '8px', background: `${color}18`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={iconId} size={16} />
          </div>
          {label}
        </span>
        <span className="prg-nums">{fmt(spent)} / {fmt(limit)}</span>
      </div>
      <div className="prg-track">
        <div className={`prg-fill ${cls}`} style={{ width: `${p}%` }}></div>
      </div>
    </div>
  );
}
