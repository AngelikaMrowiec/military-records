const currency = (value : number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);

export default currency;
