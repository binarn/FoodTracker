import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Goals() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  // KONSTANTA TARGET (Bisa diganti)
  const TARGET_CALORIES = 2150;
  const TARGET_PROTEIN = 60; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/foods', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const cal = res.data.reduce((acc, curr) => acc + curr.calories, 0);
        const prot = res.data.reduce((acc, curr) => acc + curr.protein, 0);
        setTotalCalories(cal);
        setTotalProtein(prot);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: ['Kalori (kkal)', 'Protein (g)'],
    datasets: [
      {
        label: 'Asupan Anda',
        data: [totalCalories, totalProtein],
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
      {
        label: 'Target Ideal',
        data: [TARGET_CALORIES, TARGET_PROTEIN],
        backgroundColor: '#2F2F38', // Warna gelap untuk background target
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: 'white' } } },
    scales: {
      y: { ticks: { color: '#A0A0A8' }, grid: { color: '#2F2F38' } },
      x: { ticks: { color: 'white' }, grid: { display: false } }
    }
  };

  return (
    <div>
      <h2 className="content-title" style={{marginBottom:'30px'}}>Target Harian</h2>
      
      <div className="card" style={{ height: '60vh', padding: '30px' }}>
        <h3 style={{marginBottom:'20px', color:'#A0A0A8'}}>Perbandingan Asupan vs Ideal</h3>
        <div style={{height: '80%'}}>
           <Bar data={data} options={options} />
        </div>
      </div>

      <div style={{marginTop: '30px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px'}}>
         <div className="card" style={{textAlign:'center'}}>
            <h4 style={{margin:'0 0 10px 0', color:'#A0A0A8'}}>Status Kalori</h4>
            <span style={{fontSize:'1.5rem', fontWeight:'bold', color: totalCalories > TARGET_CALORIES ? '#ef4444' : '#10b981'}}>
              {Math.round((totalCalories / TARGET_CALORIES) * 100)}% Terpenuhi
            </span>
         </div>
         <div className="card" style={{textAlign:'center'}}>
            <h4 style={{margin:'0 0 10px 0', color:'#A0A0A8'}}>Status Protein</h4>
            <span style={{fontSize:'1.5rem', fontWeight:'bold', color: totalProtein >= TARGET_PROTEIN ? '#10b981' : '#f59e0b'}}>
              {Math.round((totalProtein / TARGET_PROTEIN) * 100)}% Terpenuhi
            </span>
         </div>
      </div>
    </div>
  );
}
export default Goals;