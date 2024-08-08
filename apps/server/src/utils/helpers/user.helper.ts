function calculateTokenExpirationDate(creationDate: string): { tokenExpirationDate: Date, isExpired: boolean } {
  const creationTime = new Date(creationDate);

  if (isNaN(creationTime.getTime())) {
    throw new Error("Invalid creation time format");
  }

  const { tokenExpirationDate, isExpired } = addDays(creationTime, 30);
  const currentDate = new Date();
  const expired = tokenExpirationDate <= currentDate;

  return { tokenExpirationDate, isExpired: expired };
}

function addDays(date: Date, days: number): { tokenExpirationDate: Date, isExpired: boolean } {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return { tokenExpirationDate: result, isExpired: false };
}

export {
  calculateTokenExpirationDate,
  addDays
};
