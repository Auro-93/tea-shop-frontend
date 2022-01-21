//CONVERT TO EUROS
export const convertToEuros = (item) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(item);
};

//CALCULATE DISCOUNT
export const calcDiscount = (itemPrice, discount) => {
  let decimal = discount / 100;
  let multiply = itemPrice * decimal;
  let prodPrice = itemPrice - multiply;
  return prodPrice;
};

//NO SHIPPING COSTS START PRICE
export let noShippingCost = 35;

//SHIPPING COSTS
export let shippingCostAmount = 3.5;
