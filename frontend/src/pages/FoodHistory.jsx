import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FoodHistory() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5001/api/foods', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFoods(res.data);
  };

  const handleDelete = async (id) => {
    if(!confirm('Yakin hapus data ini?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5001/api/foods/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchFoods();
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
         <h2 className="content-title">Riwayat Makanan</h2>
         <Link to="/add"><button className="btn btn-primary">+ Tambah Makanan</button></Link>
      </div>

      <div className="card" style={{padding:'0', overflow:'hidden'}}>
        {/* Header Tabel */}
        <div className="table-header">
           <div>Foto</div>
           <div>Nama Makanan</div>
           <div>Kalori</div>
           <div>Protein</div>
           <div>Aksi</div>
        </div>

        {/* Isi Tabel */}
        <div style={{overflowY:'auto', maxHeight:'70vh'}}>
          {foods.length > 0 ? foods.map(food => (
            <div key={food._id} className="table-row">
               <div>
                 {food.image ? (
                   <img src={`http://localhost:5001/${food.image}`} style={{width:'50px', height:'50px', borderRadius:'8px', objectFit:'cover'}} />
                 ) : (
                   <div style={{width:'50px', height:'50px', background:'#333', borderRadius:'8px'}}></div>
                 )}
               </div>
               <div style={{fontWeight:'500', fontSize:'1.1rem'}}>{food.name}</div>
               <div style={{color:'#10b981', fontWeight:'bold'}}>{food.calories} kkal</div>
               <div style={{color:'#3b82f6', fontWeight:'bold'}}>{food.protein}g</div>
               <div>
                  <Link to={`/edit/${food._id}`} style={{marginRight:'10px', textDecoration:'none', color:'#A0A0A8'}}>✎</Link>
                  <button onClick={() => handleDelete(food._id)} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'1.2rem'}}>🗑</button>
               </div>
            </div>
          )) : (
            <div style={{padding:'20px', textAlign:'center', color:'#666'}}>Belum ada data makanan.</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FoodHistory;