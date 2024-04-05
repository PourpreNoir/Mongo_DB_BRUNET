const mongoose = require('mongoose');

const defiSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulte: {
    type: String,
    required: true,
  },
  // Autres champs...
});

const Defi = mongoose.model('Defi', defiSchema);

module.exports = Defi;
