export function formatILS(value: number) {
  const rounded = Math.round(Number.isFinite(value) ? value : 0);
  return `${new Intl.NumberFormat("en-US").format(rounded)} ₪`;
}

export function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value: number) {
  return `${formatNumber(value * 100, 2)}%`;
}
