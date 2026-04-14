import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { Download } from 'lucide-react';

export default function SettingsModal({ onClose }) {
  const { income, email, saveSettings, resetApp, logout } = useStore();
  const { installPromptEvent, triggerInstall } = useInstallPrompt();
  const [sEmail, setSEmail] = useState(email);
  const [sInc, setSInc] = useState(income);

  const handleSave = () => {
    saveSettings(parseInt(sInc), sEmail);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Delete all data permanently from device and cloud? حذف كل البيانات نهائياً؟')) {
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
        
        {installPromptEvent && (
          <button 
            className="btnp" 
            onClick={triggerInstall} 
            style={{ 
              marginTop: '16px', background: 'linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%)', 
              color: '#1A1A2E', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' 
            }}
          >
            <Download size={18} /> Install Thara App / تثبيت التطبيق
          </button>
        )}
        <button className="btns" onClick={logout} style={{ color: 'var(--amber)', borderColor: 'rgba(251,191,36,.3)', marginTop: '8px' }}>🚪 Logout / تسجيل خروج</button>
        <button className="btns" onClick={handleReset} style={{ color: 'var(--red)', borderColor: 'rgba(255,79,123,.3)', marginTop: '8px' }}>🗑️ Reset App / مسح البيانات</button>
        <button className="btns" onClick={onClose} style={{ marginTop: '8px' }}>Cancel / إلغاء</button>
      </div>
    </div>
  );
}
