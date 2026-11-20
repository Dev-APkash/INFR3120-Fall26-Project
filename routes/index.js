var express = require('express');
var router = express.Router();
const StudySession = require('../models/studySession');

/* GET home page (landing page with logo and hero button). */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StudySpot' });
});

/* GET create form. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create a Study Session' });
});

/* POST create form: save the new session, then go back home.
   Express 4 does not catch errors in async routes, so they are
   passed to next() to show the error page instead of crashing. */
router.post('/create', async function(req, res, next) {
  try {
    // Only take the five expected fields from the form
    const { course, topic, date, location, host } = req.body;
    await StudySession.create({ course, topic, date, location, host });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
