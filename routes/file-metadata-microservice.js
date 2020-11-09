const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const router = Router();
const upload = multer();

router.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/file-metadata-microservice.html')
  );
});

router.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { file } = req;
  const { originalname: name, mimetype: type, size } = file;

  res.json({ name, type, size });
});

module.exports = router;
