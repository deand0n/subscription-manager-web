export const getPricePerSubscriber = (fullPrice: number, subscribersAmount: number) => {
    const rawPricePerSubscriber = fullPrice / subscribersAmount;
    const roundedPrice = Math.round(rawPricePerSubscriber * 100) / 100;

    return roundedPrice;
};
