var express = require('express');
var router = express.Router();
const StudySession = require('../models/studySession');

/* GET home page: landing page with logo and hero button,
   plus a table of all study sessions sorted by date (soonest first). */
router.get('/', async function(req, res, next) {
  try {
    const sessions = await StudySession.find().sort({ date: 1 });
    res.render('index', { title: 'StudySpot', sessions });
  } catch (err) {
    next(err);
  }
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

/* GET edit form: load one session by its id and show its current values.
   If the id doesn't match a session, show a 404 page. */
router.get('/edit/:id', async function(req, res, next) {
  try {
    const session = await StudySession.findById(req.params.id);
    if (!session) {
      return next(); // falls through to the 404 handler in app.js
    }
    res.render('edit', { title: 'Edit Study Session', session });
  } catch (err) {
    next(err);
  }
});

/* POST edit form: save the changes, then go back home.
   runValidators makes the update follow the same "required" rules
   as creating a session. */
router.post('/edit/:id', async function(req, res, next) {
  try {
    const { course, topic, date, location, host } = req.body;
    await StudySession.findByIdAndUpdate(
      req.params.id,
      { course, topic, date, location, host },
      { runValidators: true }
    );
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* POST delete: remove one session, then go back home.
   This uses POST (a small form with a button) instead of a plain link,
   so a browser or crawler following links can't delete data by accident. */
router.post('/delete/:id', async function(req, res, next) {
  try {
    await StudySession.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
