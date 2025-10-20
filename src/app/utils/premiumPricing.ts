const PREMIUM_PRICE = 3000;
const PREMIUM_ISO_CURRENCY = 'ARS';
const PREMIUM_DISPLAY_CURRENCY = 'AR$';
const PREMIUM_BILLING_PERIOD = 'mes';

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: PREMIUM_ISO_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPremiumPrice(): string {
  const formatted = priceFormatter.format(PREMIUM_PRICE);
  // Reemplazamos el símbolo default "$" por "AR$" para mayor claridad regional.
  return formatted.replace('$', `${PREMIUM_DISPLAY_CURRENCY}`);
}

export function getPremiumBillingPeriodLabel(): string {
  return `/${PREMIUM_BILLING_PERIOD}`;
}

export function getPremiumPriceValue(): number {
  return PREMIUM_PRICE;
}

export const PREMIUM_PLAN_CURRENCY = PREMIUM_DISPLAY_CURRENCY;
export const PREMIUM_PLAN_BILLING_PERIOD = PREMIUM_BILLING_PERIOD;
