import { create } from 'zustand'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const INITIAL_CATS = [
  {id:'rent',ar:'إيجار',en:'Rent',icon:'🏠',group:'ess',c:'#b794f4'},
  {id:'food',ar:'طعام',en:'Groceries',icon:'🛒',group:'ess',c:'#22d3ee'},
  {id:'trans',ar:'مواصلات',en:'Transport',icon:'🚌',group:'ess',c:'#34d399'},
  {id:'bills',ar:'فواتير',en:'Bills',icon:'⚡',group:'ess',c:'#fbbf24'},
  {id:'health',ar:'صحة',en:'Health',icon:'💊',group:'ess',c:'#f87171'},
  {id:'dining',ar:'مطاعم',en:'Dining',icon:'🍽️',group:'var',c:'#fb923c'},
  {id:'shop',ar:'تسوق',en:'Shopping',icon:'🛍️',group:'var',c:'#e879f9'},
  {id:'subs',ar:'اشتراكات',en:'Subscriptions',icon:'📱',group:'var',c:'#60a5fa'},
  {id:'edu',ar:'تعليم',en:'Education',icon:'📚',group:'var',c:'#a3e635'},
  {id:'save',ar:'ادخار',en:'Savings',icon:'💰',group:'fin',c:'#f7c948'},
  {id:'inv',ar:'استثمار',en:'Investment',icon:'📈',group:'fin',c:'#00e5c0'},
  {id:'other',ar:'أخرى',en:'Other',icon:'📦',group:'var',c:'#94a3b8'},
];

let uid = localStorage.getItem('thara_uid');
if (!uid) {
  uid = 'user_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('thara_uid', uid);
}

const syncToCloud = async (state) => {
    try {
        const userRef = doc(db, 'users', uid);
        const { cats, toastMessage, ...pureState } = state; 
        await setDoc(userRef, pureState, { merge: true });
        console.log("☁️ State backed up to Firebase.");
    } catch(err) {
        console.error("Cloud Sync Error (Check Firebase Rules):", err);
        if (useStore.getState) {
          useStore.getState().showToast('❌ الداتا متسجلتش! برجاء فتح Rules في Firebase');
        }
    }
}

const commitState = (oldState, newState) => {
    const finalState = { ...oldState, ...newState };
    localStorage.setItem('thara2', JSON.stringify(finalState));
    syncToCloud(finalState);
    return newState;
}

const getLocalState = () => {
    try {
        const d = localStorage.getItem('thara2');
        if (d) {
            const st = JSON.parse(d);
            syncToCloud(st); // trigger initial backup loop
            return st;
        }
    } catch(err) {}
    
    return {
        setup: false,
        name: 'أحمد',
        income: 0,
        email: '',
        alloc: { ess: 60, sav: 20, inv: 10, disc: 10 },
        investments: [],
        transactions: [],
        budgets: {},
        toastMessage: ''
    };
};

export const useStore = create((set, get) => ({
    ...getLocalState(),
    cats: INITIAL_CATS,

    updateAlloc: (key, val) => set((state) => {
        const newAlloc = { ...state.alloc, [key]: parseInt(val) || 0 };
        return commitState(state, { alloc: newAlloc });
    }),

    doSetup: (income, email, name) => set((state) => {
        let newBudgets = { ...state.budgets };
        INITIAL_CATS.forEach(c => {
            if (!newBudgets[c.id]) {
                let p = 0;
                if(c.group==='ess') p = state.alloc.ess / 5;
                else if(c.id==='save') p = state.alloc.sav;
                else if(c.id==='inv') p = state.alloc.inv;
                else if(c.group==='var') p = state.alloc.disc / 5;
                else if(c.group==='fin') p = state.alloc.inv / 2;
                newBudgets[c.id] = Math.round(income * (p / 100));
            }
        });
        return commitState(state, { setup: true, income, email, name: name || 'أحمد', budgets: newBudgets });
    }),

    addTransaction: (tx) => {
        set((state) => commitState(state, { transactions: [tx, ...state.transactions] }));
        get().showToast('✅ تم حفظ المعاملة بنجاح (والمزامنة السحابية)');
    },

    saveBudget: (id, val) => {
        set((state) => commitState(state, { budgets: { ...state.budgets, [id]: parseInt(val) || 0 } }));
        get().showToast('✅ تم حفظ الميزانية');
    },

    saveSettings: (income, email) => {
        set((state) => commitState(state, { income: income || state.income, email }));
        get().showToast('✅ تم تحديث الإعدادات السحابية');
    },

    hydrateFromCloud: async (userUid, userEmail) => {
        // Cache the real UID so further operations sync to it
        localStorage.setItem('thara_uid', userUid);
        uid = userUid;
        try {
            const snap = await getDoc(doc(db, 'users', userUid));
            if (snap.exists()) {
                const data = snap.data();
                const newState = { ...data, setup: true, email: userEmail || data.email };
                set(newState);
                localStorage.setItem('thara2', JSON.stringify({ ...get(), ...newState }));
                get().showToast('تم استرجاع بياناتك بنجاح من السحابة ☁️');
                return true;
            }
        } catch(err) {
            console.error(err);
        }
        return false;
    },

    showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => set({ toastMessage: '' }), 3000);
    },

    resetApp: () => {
        localStorage.removeItem('thara2');
        const emptyState = {
            setup: false, name: 'أحمد', income: 0, email: '',
            alloc: { ess: 60, sav: 20, inv: 10, disc: 10 },
            investments: [], transactions: [], budgets: {}
        };
        syncToCloud(emptyState);
        set(emptyState);
    },

    logout: () => {
        if(window.confirm('Are you sure you want to logout? تسجيل خروج؟')) {
            localStorage.removeItem('thara2');
            localStorage.removeItem('thara_uid');
            window.location.reload();
        }
    },

    addInvestment: (investment) => {
        set((state) => commitState(state, { investments: [...(state.investments || []), { ...investment, id: Date.now() }] }));
        get().showToast('✅ تم إضافة الاستثمار (ومزامنته)');
    }
}));
