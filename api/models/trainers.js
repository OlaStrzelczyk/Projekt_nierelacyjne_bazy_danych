const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    bio: { type: String, required: true },
    experience: { type: String, required: true },
    contact: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    classes: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }  
});


module.exports = mongoose.model("Trainer", trainerSchema);