const path = require('path');
const { Router } = require('express');
const router = Router();
const { validateDate } = require('../utils/validateDate');

router.get('/', (req, res) => [
  res.sendFile(path.join(__dirname, '../views/timestamp-microservice.html')),
]);

router.get('/api/timestamp', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

router.get('/api/timestamp/:dateString', (req, res) => {
  const { dateString } = req.params;

  const { isValid, date, error } = validateDate(dateString);

  if (isValid) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error });
  }
});

module.exports = router;
