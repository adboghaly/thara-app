import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import GeometricCharacters from '../../components/GeometricCharacters';
import { Eye, EyeOff, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function SetupScreen() {
  const { doSetup, hydrateFromCloud, showToast } = useStore();
  
  const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Register
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [income, setIncome] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeInput, setActiveInput] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!isLogin && (!name || !income)) return;
    
    setIsLoading(true);
    try {
        if (isLogin) {
            // LOGIN (Fetch Data from Firestore)
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const success = await hydrateFromCloud(cred.user.uid, cred.user.email);
            if (!success) {
                 showToast(' تم الدخول بنجاح! جاري تهيئة مساحتك لأول مرة ☁️');
                 // Fix: Don't force them back to register. Just initialize a blank profile so they can enter!
                 doSetup(0, cred.user.email, 'مستخدم جديد');
            }
        } else {
            // REGISTER (Create new Firestore user)
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await hydrateFromCloud(cred.user.uid, cred.user.email); // Just to set the module UID
            doSetup(Number(income), email, name);
        }
    } catch(err) {
        if(err.code === 'auth/invalid-credential') showToast('❌ الإيميل أو الباسوورد غلط');
        else if(err.code === 'auth/email-already-in-use') showToast('❌ الإيميل ده مسجل قبل كده، جرب تسجل دخول');
        else showToast('❌ حدث خطأ: ' + err.code);
    }
    setIsLoading(false);
  };

  const inputStyle = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ddd',
    padding: '12px 0',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#111',
    transition: 'border-color 0.3s'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '4px'
  };

  return (
    <div 
      dir="rtl" 
      style={{ 
        position: 'fixed', top: 0, left: 0, zIndex: 100,
        width: '100vw', height: '100vh', 
        display: 'flex', backgroundColor: '#E5E7EB', overflow: 'hidden'
      }}
    >
      {/* Right Panel: Form UI */}
      <div style={{ 
        width: '50%', height: '100%', backgroundColor: '#fff', 
        boxShadow: '-20px 0 40px rgba(0,0,0,0.03)', 
        borderBottomRightRadius: '3rem', zIndex: 10,
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        
        <img 
          src="/thara_logo.png" alt="Thara" 
          style={{
            position: 'absolute', width: '120%', height: '120%', objectFit: 'contain',
            opacity: 0.05, pointerEvents: 'none', zIndex: 0,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
          }}
        />

        <div style={{ position: 'absolute', top: '32px', right: '32px', color: '#000', opacity: 0.8, zIndex: 1 }}>
          <Sparkles size={24} />
        </div>

        <div style={{ width: '100%', maxWidth: '380px', padding: '20px', zIndex: 1, position: 'relative' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>
            {isLogin ? 'مرحباً بعودتك! 👋' : 'أهلاً بك في ثروة!'}
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>
            {isLogin ? 'أدخل إيميلك ورقمك السري لاسترجاع بياناتك من السحابة ثانية' : 'أدخل بياناتك لإنشاء حساب جديد وحفظه في السحابة'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {!isLogin && (
              <>
                <div>
                  <label style={labelStyle}>الاسم الأول</label>
                  <input type="text" placeholder="مثال: أحمد" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setActiveInput('name')} onBlur={() => setActiveInput(null)} style={inputStyle} required={!isLogin} />
                </div>
                <div>
                  <label style={labelStyle}>الدخل الشهري الأساسي</label>
                  <input type="number" placeholder="10000" value={income} onChange={(e) => setIncome(e.target.value)} onFocus={() => setActiveInput('income')} onBlur={() => setActiveInput(null)} style={inputStyle} required={!isLogin} />
                </div>
              </>
            )}

            <div>
              <label style={labelStyle}>الإيميل</label>
              <input type="email" placeholder="you@thara.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setActiveInput('email')} onBlur={() => setActiveInput(null)} style={{ ...inputStyle, direction: 'ltr', textAlign: 'left', fontFamily: 'sans-serif' }} required />
            </div>
            
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>كلمة المرور</label>
              <input type={isPasswordVisible ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setActiveInput('password')} onBlur={() => setActiveInput(null)} style={{ ...inputStyle, direction: 'ltr', textAlign: 'left', fontFamily: 'monospace' }} minLength={6} required />
              <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={{ position: 'absolute', left: 0, bottom: '12px', background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                width: '100%', backgroundColor: isLoading ? '#888' : '#1A1A2E', color: '#fff',
                padding: '16px', borderRadius: '12px', fontWeight: 'bold',
                fontSize: '16px', border: 'none', cursor: isLoading ? 'wait' : 'pointer',
                marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {isLoading ? 'جاري التحميل...' : (isLogin ? <><LogIn size={18} /> تسجيل الدخول</> : <><UserPlus size={18} /> إنشاء الحساب</>)}
            </button>
          </form>

          {/* Toggle Login/Register Mode */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
            {isLogin ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Cairo' }}
            >
              {isLogin ? "سجل الآن مجاناً" : "تسجيل الدخول"}
            </button>
          </div>

        </div>
      </div>

      {/* Left Panel: Geometric Characters */}
      <div style={{ width: '50%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ zIndex: 1, position: 'relative' }}>
          <GeometricCharacters mousePosition={mousePosition} activeInput={activeInput} isPasswordVisible={isPasswordVisible} />
        </div>
      </div>
    </div>
  );
}
