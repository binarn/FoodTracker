import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditFood() {
  // State asli Anda (tetap digunakan untuk logika backend)
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // --- Logika Fetch Data untuk Edit (Tidak diubah) ---
  useEffect(() => {
    if (id) {
       const fetchFood = async () => {
         try {
           const token = localStorage.getItem('token');
           const res = await axios.get(`http://localhost:5001/api/foods/${id}`, {
             headers: { Authorization: `Bearer ${token}` }
           });
           setName(res.data.name);
           setCalories(res.data.calories);
           setProtein(res.data.protein);
           if(res.data.image) {
             setPreviewUrl(`http://localhost:5001/${res.data.image}`);
           }
         } catch (err) {
           alert('Gagal mengambil data untuk edit');
         }
       };
       fetchFood();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('calories', calories);
    formData.append('protein', protein);
    if (image) formData.append('image', image);

    try {
      let url = 'http://localhost:5001/api/foods';
      let method = 'post';
      if (id) {
        url = `${url}/${id}`;
        method = 'put';
      }

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (err) {
       console.error(err);
       const errMsg = err.response?.data?.error || err.message;
       alert(`Gagal menyimpan data: ${errMsg}`);
    }
  };

  // --- RENDER TAMPILAN BARU ---
  return (
    <div>
      {/* Header Halaman */}
      <div className="content-header">
        <h2 className="content-title">{id ? 'Edit Makanan' : 'Tambah Makanan Baru'}</h2>
        <button className="close-btn" onClick={() => navigate('/')}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid-layout">
          {/* --- KOLOM KIRI: INPUT FIELDS --- */}
          <div className="form-left-column">
            
            {/* Input Nama Makanan */}
            <div className="form-group">
              <label className="form-label">Nama Makanan*</label>
              <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required placeholder="contoh: Nasi Gudeg" />
            </div>

             {/* Input Group: Kalori */}
            <div className="form-group">
              <label className="form-label">Kalori*</label>
              <div className="input-group">
                <input type="number" className="form-input" value={calories} onChange={e => setCalories(e.target.value)} required placeholder="0" />
                <select className="form-select">
                  <option>kkal</option>
                  <option>kal</option>
                </select>
              </div>
            </div>
            
             {/* Checkbox */}
            <div className="form-group" style={{gridTemplateColumns: '120px 1fr'}}>
              <div></div> {/* Spacer untuk label */}
              <div className="checkbox-group">
                  <input type="checkbox" id="reimbursable" defaultChecked />
                  <label htmlFor="reimbursable">Makanan Sehat</label>
              </div>
            </div>

            {/* Select: Protein */}
            <div className="form-group">
              <label className="form-label">Protein*</label>
              <select className="form-select" value={protein} onChange={e => setProtein(e.target.value)} required>
                <option value="">Pilih Tipe</option>
                <option value="10">Tinggi Protein</option>
                <option value="20">Protein Sedang</option>
                <option value="30">Protein Rendah</option>
              </select>
            </div>

             {/* Textarea */}
            <div className="form-group" style={{alignItems: 'start'}}>
              <label className="form-label" style={{marginTop: '12px'}}>Deskripsi</label>
              <textarea className="form-textarea" placeholder="Tambahkan detail makanan..."></textarea>
            </div>

          </div> {/* Akhir Kolom Kiri */}

          {/* --- KOLOM KANAN: UPLOAD AREA --- */}
          <div className="form-right-column">
             {/* Trik: Label membungkus area agar bisa diklik untuk upload */}
            <label className="upload-container">
              <input type="file" onChange={handleImageChange} hidden accept="image/*" />
              
              {previewUrl ? (
                // Tampilan jika ada gambar dipilih/diedit
                <img src={previewUrl} alt="Preview" style={{maxWidth:'90%', maxHeight:'90%', borderRadius:'12px', objectFit:'contain'}} />
              ) : (
                // Tampilan default (ikon tambah)
                <>
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">Unggah Foto Makanan</div>
                  <div className="upload-subtext">Klik untuk memilih atau seret dan lepas</div>
                </>
              )}
            </label>
          </div> {/* Akhir Kolom Kanan */}

        </div> {/* Akhir Grid Layout */}

        {/* --- FOOTER: TOMBOL AKSI --- */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Simpan Draft</button>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditFood;