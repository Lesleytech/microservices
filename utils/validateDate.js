const validateDate = (date) => {
  if (date.match(/\D/g)) {
    if (Date.parse(date)) {
      return { isValid: true, date: new Date(date) };
    }
  } else {
    date = parseInt(date);

    if (date <= new Date().getTime()) {
      return { isValid: true, date: new Date(date) };
    }
  }

  return { isValid: false, error: new Date(date).toString() };
};

module.exports = { validateDate };
