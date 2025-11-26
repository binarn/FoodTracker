const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Models
const User = require('./models/User');
const Food = require('./models/Food');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve folder uploads sebagai static agar gambar bisa diakses frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Pastikan folder uploads ada
if (!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
}

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Multer Config (Upload Image)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Middleware Auth
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// === ROUTES ===

// 1. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CRUD: Read All (Get Foods)
app.get('/api/foods', verifyToken, async (req, res) => {
  try {
    const foods = await Food.find({ user: req.userId });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CRUD: Create (Add Food with Image)
app.post('/api/foods', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, calories, protein } = req.body;
    const imagePath = req.file ? req.file.path : null; // Simpan path gambar

    const newFood = await Food.create({
      name,
      calories,
      protein,
      image: imagePath,
      user: req.userId
    });
    res.json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. CRUD: Update
app.put('/api/foods/:id', verifyToken, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. CRUD: Delete
app.delete('/api/foods/:id', verifyToken, async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));