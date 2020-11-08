const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const timestamp = require('./routes/timestamp-microservice');
const requestHeader = require('./routes/request-header-microservice');
const urlShortener = require('./routes/url-shortener-microservice');
const exerciseTracker = require('./routes/exercise-tracker');
const fileMetadata = require('./routes/file-metadata-microservice');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/timestamp-microservice', timestamp);
app.use('/request-header-parser-microservice', requestHeader);
app.use('/url-shortener-microservice', urlShortener);
app.use('/exercise-tracker', exerciseTracker);
app.use('/file-metadata-microservice', fileMetadata);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
