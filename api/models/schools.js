const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },  // Referencja do trenera
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]  // Referencja do zajęć
});

module.exports = mongoose.model("School", schoolSchema);