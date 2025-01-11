const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School'},
  price: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  reviews: [
    {
      text: { type: String, required: true }, // Treść opinii
      rating: { type: Number, required: true, min: 1, max: 5 }, // Ocena (1-5)
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referencja do autora opinii
      date: { type: Date, default: Date.now } // Data dodania opinii
    }
  ]
});

module.exports = mongoose.model("Class", classSchema);