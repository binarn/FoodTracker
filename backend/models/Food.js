const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  image: { type: String }, // Menyimpan path gambar
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relasi ke User
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);