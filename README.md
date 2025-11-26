# 🍽️ FoodTracker

**Aplikasi pelacakan makanan dan kalori berbasis web yang membantu pengguna mengelola pola makan dan mencapai target nutrisi harian.**

## 📋 Problem Statement (Masalah yang Diselesaikan)

Banyak orang kesulitan untuk:
- Melacak asupan kalori dan nutrisi harian mereka
- Mengingat makanan apa saja yang telah dikonsumsi
- Memantau progress pencapaian target kalori dan protein
- Mengelola data makanan secara terorganisir dengan visual yang menarik
- Memiliki catatan makanan yang dapat diakses kapan saja

## 💡 Solution Overview (Solusi yang Dibuat)

FoodTracker adalah aplikasi web yang menyediakan:
- **Dashboard interaktif** dengan visualisasi data menggunakan Chart.js
- **Sistem autentikasi** yang aman untuk melindungi data personal
- **Manajemen makanan lengkap** dengan fitur CRUD (Create, Read, Update, Delete)
- **Upload foto makanan** untuk dokumentasi visual
- **Tracking kalori dan protein** dengan progress monitoring
- **Riwayat makanan** yang tersimpan dengan baik
- **Goal setting** untuk target nutrisi harian

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Library JavaScript untuk UI
- **Vite** - Build tool yang cepat untuk development
- **React Router Dom** - Navigasi antar halaman
- **Axios** - HTTP client untuk API calls
- **Chart.js + React-ChartJS-2** - Visualisasi data interaktif
- **CSS3** - Styling dan responsive design

### Backend
- **Node.js + Express.js** - Server dan API framework
- **MongoDB + Mongoose** - Database NoSQL dan ODM
- **JWT (JsonWebToken)** - Autentikasi dan authorization
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

## ✨ Fitur Utama

### 🔐 Autentikasi & Keamanan
- Register dan login user
- Password encryption dengan bcrypt
- JWT token untuk session management
- Protected routes dan API endpoints

### 🍔 Manajemen Makanan
- Tambah makanan baru dengan foto
- Edit informasi makanan
- Hapus makanan dari database
- Lihat daftar semua makanan

### 📊 Dashboard & Analytics
- Grafik kalori dan protein harian
- Progress tracking menuju target
- Visual yang menarik dan informatif

### 📸 Upload Gambar
- Upload foto makanan
- Penyimpanan gambar yang aman
- Preview gambar di aplikasi

## 🚀 Cara Menjalankan Project

### Prerequisites
Pastikan kamu sudah install:
- **Node.js** (v14 atau lebih baru)
- **npm** atau **yarn**
- **MongoDB** (lokal atau cloud)

### 1. Clone Repository
```bash
git clone https://github.com/binarn/FoodTracker.git
cd FoodTracker
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Buat file `.env` di folder backend:
```env
PORT=5001
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/foodtracker
JWT_SECRET=your-secret-key
```

Jalankan backend server:
```bash
npm start
```
Server akan berjalan di `http://localhost:5001`

### 3. Setup Frontend
Buka terminal baru, lalu:
```bash
cd frontend
npm install
```

Jalankan frontend development server:
```bash
npm run dev
```
Aplikasi akan terbuka di `http://localhost:5173`

### 4. Akses Aplikasi
- Buka browser dan kunjungi `http://localhost:5173`
- Register akun baru atau login
- Mulai tracking makanan kamu! 🎉

## 📁 Struktur Project

```
FoodTracker/
├── backend/
│   ├── models/
│   │   ├── Food.js      # Model data makanan
│   │   └── User.js      # Model data user
│   ├── uploads/         # Folder penyimpanan gambar
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/  # Komponen React
│   │   ├── pages/       # Halaman aplikasi
│   │   ├── assets/      # Gambar dan assets
│   │   └── App.jsx      # Main App component
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Penggunaan

1. **Register/Login** - Buat akun atau masuk ke akun existing
2. **Dashboard** - Lihat overview kalori dan protein hari ini
3. **Add Food** - Tambah makanan baru dengan foto dan info nutrisi
4. **Food History** - Lihat semua makanan yang pernah ditambahkan
5. **Goals** - Set dan track target nutrisi harian

## 👨‍💻 Developer

Dibuat dengan ❤️ oleh **Binar Najmuddin**

---

*Happy tracking! 🌟*