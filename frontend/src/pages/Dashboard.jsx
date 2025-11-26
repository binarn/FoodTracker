import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  // TARGET HARIAN (Hardcoded untuk contoh tampilan)
  const TARGET_CALORIES = 2000;
  
  // DATA DUMMY (Untuk mengisi widget Carbs/Fat yang belum ada di database)
  const carbsPercentage = 45;
  const fatPercentage = 30;
  const sugarPercentage = 75;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/foods', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoods(res.data);
      
      const cal = res.data.reduce((acc, curr) => acc + curr.calories, 0);
      const prot = res.data.reduce((acc, curr) => acc + curr.protein, 0);
      setTotalCalories(cal);
      setTotalProtein(prot);
    } catch (err) {
      console.error(err);
    }
  };

  // Konfigurasi Chart Ring Utama
  const chartData = {
    labels: ['Terpenuhi', 'Sisa'],
    datasets: [
      {
        data: [totalCalories, TARGET_CALORIES - totalCalories > 0 ? TARGET_CALORIES - totalCalories : 0],
        backgroundColor: ['#FF754C', '#F4F7FE'], // Oranye & Abu muda
        borderWidth: 0,
        borderRadius: 20, // Ujung bulat
      },
    ],
  };

  return (
    <div>
      {/* HEADER ATAS */}
      <div className="top-header">
        <div>
          <p className="page-title">Halaman / Dasbor</p>
          <h1 className="page-subtitle">Dasbor Utama</h1>
        </div>
        <div className="header-profile">
          <Link to="/add"><button className="btn-primary" style={{marginRight:'15px', padding:'8px 20px', fontSize:'0.8rem'}}>+ Tambah Makanan</button></Link>
          <div style={{textAlign:'right', marginRight:'10px'}}>
            <div style={{fontWeight:'700', fontSize:'0.9rem'}}>Pengguna Tamu</div>
            <div style={{fontSize:'0.8rem', color:'#A3AED0'}}>Paket Gratis</div>
          </div>
          <img src="/src/assets/avatar.png" className="avatar-small" alt="User" />
        </div>
      </div>

      {/* BANNER CUACA */}
      <div className="weather-banner">
        <span style={{fontSize:'1.5rem'}}>☀️</span>
        <span>29°C Cuaca Panas, jangan lupa minum air hangat hari ini!</span>
      </div>

      {/* LAYOUT GRID UTAMA */}
      <div className="dashboard-grid">
        
        {/* KOLOM KIRI: TODAY MISSION (CHART) */}
        <div className="card mission-card">
           {/* Chart Lingkaran */}
           <div style={{textAlign:'center'}}>
              <h3 style={{margin:'0 0 20px 0', textAlign:'left'}}>Misi Hari Ini</h3>
              <div className="chart-circle">
                <Doughnut 
                  data={chartData} 
                  options={{ cutout: '85%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} 
                />
                <div className="chart-center-text">
                  <span style={{fontSize:'1.5rem'}}>🔥</span>
                  <h2>{totalCalories}</h2>
                  <p>dari {TARGET_CALORIES} kkal</p>
                </div>
              </div>
           </div>

           {/* Grid Macro Nutrisi (Kanan Chart) */}
           <div className="macro-grid">
              <div className="macro-item">
                 <small style={{color:'#A3AED0'}}><span className="dot" style={{background:'#FF754C'}}></span>Protein</small>
                 <h2 style={{margin:'5px 0'}}>{totalProtein}g</h2>
                 <small>60% Target</small>
              </div>
              <div className="macro-item">
                 <small style={{color:'#A3AED0'}}><span className="dot" style={{background:'#7551FF'}}></span>Karbohidrat</small>
                 <h2 style={{margin:'5px 0'}}>{carbsPercentage}%</h2>
                 <small>Target</small>
              </div>
              <div className="macro-item">
                 <small style={{color:'#A3AED0'}}><span className="dot" style={{background:'#05CD99'}}></span>Lemak</small>
                 <h2 style={{margin:'5px 0'}}>{fatPercentage}%</h2>
                 <small>Target</small>
              </div>
              <div className="macro-item">
                 <small style={{color:'#A3AED0'}}><span className="dot" style={{background:'#FF4D4D'}}></span>Gula</small>
                 <h2 style={{margin:'5px 0'}}>{sugarPercentage}%</h2>
                 <small>Batas</small>
              </div>
           </div>
        </div>

        {/* KOLOM KANAN: CALORIE INTAKE & TIPS */}
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
           {/* Calorie Intake Widget */}
           <div className="card water-card" style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <h4 style={{margin:0, color:'#FF754C'}}>Sel, 27 November 2025</h4>
              <h2 style={{fontSize:'1.8rem', margin:'10px 0'}}>{totalCalories} / {TARGET_CALORIES} kkal</h2>
              <p style={{color:'#A3AED0', fontSize:'0.9rem'}}>Target Asupan Kalori</p>
              <div style={{fontSize:'3rem', position:'absolute', bottom:'10px', right:'20px'}}>🔥</div>
           </div>
           
           {/* Tips Widget */}
           <div className="card" style={{background:'#E6FDF9', color:'#05CD99', flex:1, display:'flex', alignItems:'center'}}>
              <div>
                <h4 style={{margin:'0 0 5px 0'}}>Tips Sehat</h4>
                <p style={{margin:0, fontSize:'0.9rem'}}>Perbanyak makan sayuran!</p>
              </div>
              <div style={{fontSize:'2.5rem', marginLeft:'auto'}}>🥦</div>
           </div>
        </div>

      </div>

      {/* FOOTER: NEXT MEALS (History Makanan Horizontal) */}
      <h3 style={{marginTop:'30px', marginBottom:'15px'}}>Riwayat Makanan</h3>
      <div className="meal-scroll">
        {foods.length > 0 ? foods.map(food => (
          <div key={food._id} className="meal-card">
            {food.image ? (
               <img src={`http://localhost:5001/${food.image}`} className="meal-img" />
            ) : (
               <div className="meal-img" style={{background:'#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>🍔</div>
            )}
            <div>
               <h4 style={{margin:'0 0 5px 0'}}>{food.name}</h4>
               <p style={{margin:0, fontSize:'0.8rem', color:'#A3AED0'}}>{food.calories} kkal • {food.protein}g P</p>
            </div>
          </div>
        )) : <p>Belum ada data makanan hari ini.</p>}
      </div>

    </div>
  );
}

export default Dashboard;