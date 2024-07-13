export function formattedPrice(cents: number) {
    return `${Math.floor(cents).toFixed(2)}`;
  }
  export function formatToDollar(cents: number) {
    return `${Math.floor(cents/100).toFixed(2)}`;
  }