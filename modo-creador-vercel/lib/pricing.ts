export const BASE_PRICE = 99.99;
export function paymentQuote(method:string, plan:string){
  const totalCents=method==='binance'&&plan==='full'?Math.round(9999*.9):9999;
  const amountCents=plan==='reserve'?Math.round(totalCents/2):totalCents;
  return {total:totalCents/100,amount:amountCents/100,balance:(totalCents-amountCents)/100};
}
