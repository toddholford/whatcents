export const addCurrencyZeroes = (amount) => {

    if (amount === '') {return null;}

    let currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return currency.format(amount);
}