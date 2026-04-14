import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

export default function SettingsModal({ onClose }) {
  const { income, email, saveSettings, resetApp } = useStore();
  const [sEmail, setSEmail] = useState(email);
  const [sInc, setSInc] = useState(income);

  const handleSave = () => {
    saveSettings(parseInt(sInc), sEmail);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Delete all data? حذف كل البيانات؟')) {
      resetApp();
      window.location.reload();
    }
  };

  return (
    <div className="moverlay on" style={{ display: 'flex' }}>
      <div className="modal">
        <div className="mhandle"></div>
        <div className="mtitle">Settings / الإعدادات</div>
        <div className="fg-wrap">
          <div className="flabel">📧 Report Email / بريد التقارير</div>
          <input className="fi" type="email" value={sEmail} onChange={e => setSEmail(e.target.value)} dir="ltr" placeholder="your@email.com" />
        </div>
        <div className="fg-wrap">
          <div className="flabel">💰 Monthly Income / الدخل الشهري</div>
          <input className="fi" type="number" value={sInc} onChange={e => setSInc(e.target.value)} inputMode="numeric" />
        </div>
        <button className="btnp" onClick={handleSave}>Save / حفظ</button>
        <button className="btns" onClick={handleReset} style={{ color: 'var(--red)', borderColor: 'rgba(255,79,123,.3)', marginTop: '16px' }}>🗑️ Reset App / إعادة تعيين</button>
        <button className="btns" onClick={onClose}>Cancel / إلغاء</button>
      </div>
    </div>
  );
}
