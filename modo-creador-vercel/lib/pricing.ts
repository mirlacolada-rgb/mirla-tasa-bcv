export const BASE_PRICE = 59.99;
export const BINANCE_PRICE = 55;
export function paymentQuote(method:string, plan:string){
  const totalCents=method==='binance'?Math.round(BINANCE_PRICE*100):Math.round(BASE_PRICE*100);
  const amountCents=plan==='reserve'?Math.round(totalCents/2):totalCents;
  return {total:totalCents/100,amount:amountCents/100,balance:(totalCents-amountCents)/100};
}
