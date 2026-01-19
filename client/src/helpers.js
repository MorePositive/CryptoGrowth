const THRESHOLDS = [
  { label:'T', value: 1000 * 1000 * 1000 * 1000 },
  { label:'B', value: 1000 * 1000 * 1000 },
  { label:'M', value: 1000 * 1000 },
  { label:'K',  value: 1000 }
];

export const formatBigNumber = (amount) => {
  for (let i=0; i<THRESHOLDS.length; i++) {
    if (amount > THRESHOLDS[i].value) {
      return (amount / THRESHOLDS[i].value).toFixed(2) + ' ' + THRESHOLDS[i].label;
    }
  }
  return amount.toFixed(2);
};

export const isClient = () => typeof window !== 'undefined';

export const priceFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const dateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full'
});

export const dateShortFormat = new Intl.DateTimeFormat({
  dateStyle: 'short'
});

