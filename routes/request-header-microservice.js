const path = require('path');
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/request-header-microservice.html')
  );
});

router.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});
module.exports = router;
