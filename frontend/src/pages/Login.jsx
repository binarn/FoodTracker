import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ setToken }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', formData.username);
      setToken(res.data.token);
    } catch (err) {
      alert('Login Gagal - Silakan periksa kredensial Anda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">
            Pelacak<span className="logo-accent">Makanan</span>
          </h1>
          <h2 className="auth-title">Selamat Datang Kembali</h2>
          <p className="auth-subtitle">Masuk untuk melanjutkan perjalanan nutrisi Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label className="field-label">Nama Pengguna</label>
            <input 
              type="text" 
              className="field-input"
              placeholder="Masukkan nama pengguna Anda" 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              required 
            />
          </div>

          <div className="form-field">
            <label className="field-label">Kata Sandi</label>
            <input 
              type="password" 
              className="field-input"
              placeholder="Masukkan kata sandi Anda" 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Belum punya akun? <Link to="/register" className="auth-link">Buat Akun</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;