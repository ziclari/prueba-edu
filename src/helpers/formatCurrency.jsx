export default function formatCurrency(value) {
  if (!value || value === 0) return '';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(value);
}
