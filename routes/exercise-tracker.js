const path = require('path');
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const { Router } = require('express');
const router = Router();

const userSchema = new mongoose.Schema({
  username: String,
});

const exerciseSchema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: String,
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/exercise-tracker.html'));
});

router.post('/api/exercise/new-user', async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });

  if (user) return res.status(400).send('Username already taken');

  user = new User({ username });
  const { _id } = await user.save();

  res.json({ username, _id });
});

router.get('/api/exercise/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/api/exercise/add', async (req, res) => {
  if (!req.body.date) req.body.date = dayjs().format('YYYY-MM-DD');

  const exercise = new Exercise({
    ...req.body,
    duration: parseInt(req.body.duration),
  });
  const { description, duration, date } = await exercise.save();
  const { _id, username } = await User.findById(req.body.userId);

  res.json({
    _id,
    username,
    description,
    duration,
    date: dayjs(date).format('ddd MMM DD YYYY'),
  });
});

router.get('/api/exercise/log', async (req, res) => {
  const { userId, limit, from, to } = req.query;

  const { _id, username } = await User.findOne({ _id: userId });
  const exercises = await Exercise.find({
    date: {
      $gte: from ? from : 0,
      $lte: to ? to : 'A',
    },
    userId,
  })
    .limit(parseInt(limit))
    .select('description duration date -_id');

  res.json({ _id, username, count: exercises.length, log: exercises });
});

module.exports = router;
