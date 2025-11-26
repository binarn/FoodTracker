import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/auth/register', formData);
      alert('Registrasi Berhasil! Silakan Login.');
      navigate('/login');
    } catch (err) {
      console.error(err); 
      if (err.response && err.response.data && err.response.data.error) {
        alert("Gagal: " + err.response.data.error);
      } else {
        alert("Gagal: " + err.message);
      }
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
          <h2 className="auth-title">Buat Akun</h2>
          <p className="auth-subtitle">Bergabunglah dengan kami dan mulai perjalanan nutrisi Anda</p>
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
              placeholder="Buat kata sandi yang kuat" 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Membuat Akun...' : 'Buat Akun'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Sudah punya akun? <Link to="/login" className="auth-link">Masuk</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;