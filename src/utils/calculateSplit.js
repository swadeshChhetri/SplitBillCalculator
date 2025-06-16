export function calculateSplit(bill, tipPercent, people) {
  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount;
  return total / people;
}
