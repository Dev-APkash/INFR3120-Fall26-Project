// Mongoose model for one study session.
// Every field is required so empty sessions can't be saved;
// timestamps adds createdAt/updatedAt automatically.
const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  course:   { type: String, required: true, trim: true }, // e.g. INFR3120
  topic:    { type: String, required: true, trim: true }, // what will be studied
  date:     { type: Date,   required: true },             // when it starts
  location: { type: String, required: true, trim: true }, // room or online link
  host:     { type: String, required: true, trim: true }  // student organizing it
}, { timestamps: true });

module.exports = mongoose.model('StudySession', studySessionSchema);
