export function validateInputs(bill, tip, people) {
  return (
    bill !== '' &&
    tip !== '' &&
    people !== '' &&
    !isNaN(bill) &&
    !isNaN(tip) &&
    !isNaN(people) &&
    Number(bill) >= 0 &&
    Number(tip) >= 0 &&
    Number(people) > 0
  );
}
