import { create } from 'zustand'

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

const getLocalState = () => {
    try {
        const d = localStorage.getItem('thara2');
        if (d) return JSON.parse(d);
    } catch(err) {
        // ignore
    }
    return {
        setup: false,
        income: 0,
        email: '',
        alloc: { ess: 60, sav: 20, inv: 10, disc: 10 },
        transactions: [],
        budgets: {},
        toastMessage: ''
    };
};

export const useStore = create((set, get) => ({
    ...getLocalState(),
    cats: INITIAL_CATS,

    // Actions
    updateAlloc: (key, val) => set((state) => {
        const newAlloc = { ...state.alloc, [key]: parseInt(val) || 0 };
        const newState = { alloc: newAlloc };
        localStorage.setItem('thara2', JSON.stringify({...state, ...newState}));
        return newState;
    }),

    doSetup: (income, email) => set((state) => {
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
        const newState = { setup: true, income, email, budgets: newBudgets };
        localStorage.setItem('thara2', JSON.stringify({...state, ...newState}));
        return newState;
    }),

    addTransaction: (tx) => {
        set((state) => {
            const newState = { transactions: [tx, ...state.transactions] };
            localStorage.setItem('thara2', JSON.stringify({...state, ...newState}));
            return newState;
        });
        get().showToast('✅ تم حفظ المعاملة بنجاح');
    },

    saveBudget: (id, val) => {
        set((state) => {
            const newBudgets = { ...state.budgets, [id]: parseInt(val) || 0 };
            const newState = { budgets: newBudgets };
            localStorage.setItem('thara2', JSON.stringify({...state, ...newState}));
            return newState;
        });
        get().showToast('✅ تم حفظ الميزانية');
    },

    saveSettings: (income, email) => {
        set((state) => {
            const newState = { income: income || state.income, email };
            localStorage.setItem('thara2', JSON.stringify({...state, ...newState}));
            return newState;
        });
        get().showToast('✅ تم تحديث الإعدادات');
    },

    showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => set({ toastMessage: '' }), 3000);
    },

    resetApp: () => {
        localStorage.removeItem('thara2');
        set({
            setup: false,
            income: 0,
            email: '',
            alloc: { ess: 60, sav: 20, inv: 10, disc: 10 },
            transactions: [],
            budgets: {}
        });
    }
}));
