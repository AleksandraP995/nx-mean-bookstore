
function calculateTokenExpirationDate(creationDate) {
    const creationTime = new Date(creationDate);
  
    if (isNaN(creationTime.getTime())) {
      throw new Error("Invalid creation time format");
    }
  
    const tokenExpirationDate = addDays(creationDate, 30);
    const currentDate = new Date();
    const isExpired = tokenExpirationDate <= currentDate;
  
    return { tokenExpirationDate, isExpired };
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  module.exports = {
    calculateTokenExpirationDate,
    addDays
  };