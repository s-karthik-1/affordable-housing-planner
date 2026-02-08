import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [view, setView] = useState('login'); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputs, setInputs] = useState({ 
        budget: '', location: '', rooms: '', family: '', 
        hasVehicle: false, needsWater: false, needsElectric: false 
    });
    const [result, setResult] = useState(null);

    const API_URL = "http://127.0.0.1:5001/api";

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/${view}`, { email, password });
            if (view === 'login') setView('app');
            else { alert("Success! Log in now."); setView('login'); }
        } catch (err) { alert("Auth failed"); }
    };

    const handleCalc = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/calculate`, inputs);
            setResult(res.data);
        } catch (err) { alert("Server error"); }
    };

    // STYLING
    const cardStyle = { background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '900px', margin: 'auto' };
    const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };

    if (view === 'login' || view === 'signup') {
        return (
            <div style={{ background: '#f0f2f5', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ ...cardStyle, maxWidth: '350px' }}>
                    <h2 style={{ textAlign: 'center' }}>Housify {view.toUpperCase()}</h2>
                    <form onSubmit={handleAuth}>
                        <input style={inputStyle} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <input style={inputStyle} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                        <button style={{ ...inputStyle, background: '#27ae60', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} type="submit">{view}</button>
                    </form>
                    <p style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }} onClick={() => setView(view === 'login' ? 'signup' : 'login')}>Switch to {view === 'login' ? 'signup' : 'login'}</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '40px' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1>Housify Pro Planner</h1>
                    <button onClick={() => { setView('login'); setResult(null); }} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>

                <form onSubmit={handleCalc} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <input style={inputStyle} type="number" placeholder="Budget" onChange={e => setInputs({ ...inputs, budget: e.target.value })} required />
                    <input style={inputStyle} placeholder="Location" onChange={e => setInputs({ ...inputs, location: e.target.value })} required />
                    <input style={inputStyle} type="number" placeholder="Rooms" onChange={e => setInputs({ ...inputs, rooms: e.target.value })} required />
                    <input style={inputStyle} type="number" placeholder="Family Members" onChange={e => setInputs({ ...inputs, family: e.target.value })} required />
                    
                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                        <label><input type="checkbox" onChange={e => setInputs({ ...inputs, hasVehicle: e.target.checked })} /> Parking</label>
                        <label><input type="checkbox" onChange={e => setInputs({ ...inputs, needsWater: e.target.checked })} /> Water</label>
                        <label><input type="checkbox" onChange={e => setInputs({ ...inputs, needsElectric: e.target.checked })} /> Electricity</label>
                    </div>

                    <button style={{ ...inputStyle, background: '#27ae60', color: 'white', gridColumn: 'span 2', cursor: 'pointer', fontWeight: 'bold' }} type="submit">Generate Plan</button>
                </form>

                {/* THE PROFESSIONAL OUTPUT SECTION */}
                {result && result.estimator ? (
                    <div style={{ marginTop: '40px' }}>
                        <h2 style={{ color: '#27ae60' }}>📊 Detailed Budget Breakdown</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead style={{ background: '#27ae60', color: '#fff' }}>
                                <tr>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Item & Quantity</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Cost Estimate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.estimator.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '12px', color: '#666' }}>{row.category}</td>
                                        <td style={{ padding: '12px' }}><strong>{row.item}</strong><br/><small>{row.qty}</small></td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>${row.cost.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2 style={{ marginTop: '40px', color: '#27ae60' }}>🏗️ Phased Construction Plan</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {result.phases.map((p, i) => (
                                <div key={i} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', background: '#fcfcfc' }}>
                                    <h4 style={{ margin: '0', color: '#27ae60' }}>{p.title} ({p.duration})</h4>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{p.task}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '30px', padding: '20px', background: '#fff9c4', borderRadius: '10px', borderLeft: '8px solid #fbc02d' }}>
                            <strong>Strategic Advice:</strong> {result.advice}
                        </div>
                    </div>
                ) : (
                    result && <div style={{textAlign:'center', padding:'20px'}}>✨ Calculating your custom build...</div>
                )}
            </div>
        </div>
    );
}

export default App;