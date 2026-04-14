export const fmt = (n) => Math.round(Math.abs(n)).toLocaleString('en-US');
export const fmtS = (n) => (n >= 0 ? '+' : '-') + fmt(n);
export const curM = () => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
};

export const getMonthNameAr = (dateStr) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const monsar = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return monsar[d.getMonth()];
};

export const getMonthNameEn = (dateStr) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const mons = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return mons[d.getMonth()];
};
