const path = require('path');
const { Router } = require('express');
const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const router = Router();

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: Number,
});

const Url = mongoose.model('Url', urlSchema);

router.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/url-shortener-microservice.html')
  );
});

router.get('/api/shorturl/:short_url', async (req, res) => {
  const { short_url } = req.params;
  const { original_url } = await Url.findOne({ short_url });

  res.status(301).redirect(original_url);
});

router.post('/api/shorturl/new', async (req, res) => {
  const { url: _url } = req.body;

  if (!isUrl(_url)) {
    return res.json({ error: 'Invalid URL' });
  }

  const { original_url, short_url } = await addUrl(_url);
  res.json({ original_url, short_url });
});

async function addUrl(url) {
  const numDocs = await Url.countDocuments();

  const oldUrl = await Url.findOne({ original_url: url });

  if (oldUrl) return oldUrl;

  const newUrl = new Url({
    original_url: url,
    short_url: numDocs,
  });

  return await newUrl.save();
}

module.exports = router;
