export const isCartHasVoucherOnlyHelper = (cartList) => {
  const filtredVochers = cartList.filter(
    (item) => item.fulfillmentType === 'VOUCHER',
  );
  console.log('filtredVochers :', filtredVochers);
  return filtredVochers.length === cartList.length;
};
