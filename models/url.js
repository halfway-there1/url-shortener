const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  'url-code': { type: String, default: () => nanoid(7) },
});

module.exports = mongoose.model('URL', urlSchema);
