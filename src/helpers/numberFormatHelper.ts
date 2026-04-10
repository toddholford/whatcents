const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const addCurrencyZeroes = (amount: number | string): string | null => {
  if (amount === "") return null;
  return usd.format(Number(amount));
};
