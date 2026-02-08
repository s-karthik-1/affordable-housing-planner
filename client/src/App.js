import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [view, setView] = useState('login'); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Added for professional feel
    const [inputs, setInputs] = useState({ 
        budget: '', location: '', rooms: '', family: '', 
        hasVehicle: false, needsWater: false, needsElectric: false 
    });
    const [result, setResult] = useState(null);

    const API_URL = "http://127.0.0.1:5001/api";

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/${view}`, { email, password });
            if (view === 'login') setView('app');
            else { alert("Success! Log in now."); setView('login'); }
        } catch (err) { alert("Auth failed"); }
        finally { setLoading(false); }
    };

    const handleCalc = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/calculate`, inputs);
            setResult(res.data);
        } catch (err) { alert("Server error"); }
        finally { setLoading(false); }
    };

    // PROFESSIONAL STYLING OBJECTS
    const colors = {
        primary: '#10b981', // Emerald
        secondary: '#0f172a', // Slate
        bg: '#f8fafc',
        white: '#ffffff',
        accent: '#3b82f6'
    };

    const cardStyle = { background: colors.white, padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: 'auto' };
    const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box', outline: 'none', fontSize: '15px' };

    // 1. LOGIN / SIGNUP VIEW
    if (view === 'login' || view === 'signup') {
        return (
            <div style={{ background: colors.secondary, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ ...cardStyle, maxWidth: '400px', width: '90%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '40px' }}>🏗️</span>
                        <h2 style={{ color: colors.secondary, margin: '10px 0 5px 0' }}>Housify {view.toUpperCase()}</h2>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>Affordable Housing Planner Pro</p>
                    </div>
                    <form onSubmit={handleAuth}>
                        <input style={inputStyle} type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} required />
                        <input style={inputStyle} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                        <button disabled={loading} style={{ ...inputStyle, background: colors.primary, color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', marginTop: '15px' }}>
                            {loading ? 'Processing...' : view.toUpperCase()}
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', cursor: 'pointer', color: colors.accent, fontSize: '14px', marginTop: '20px' }} 
                       onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
                        {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        );
    }

    // 2. MAIN APP VIEW
    return (
        <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            {/* Header Area */}
            <div style={{ background: colors.secondary, color: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>🏘️</span>
                    <h2 style={{ margin: 0, letterSpacing: '1px' }}>HOUSIFY <span style={{ color: colors.primary }}>PRO</span></h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '14px', opacity: 0.8 }}>Logged in as: <strong>{email}</strong></span>
                    <button onClick={() => { setView('login'); setResult(null); }} style={{ background: 'rgba(231, 76, 60, 0.2)', color: '#ff7675', border: '1px solid #e74c3c', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', transition: '0.3s' }}>Logout</button>
                </div>
            </div>

            <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '40px' }}>
                        
                        {/* LEFT SIDE: INPUTS */}
                        <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '20px' }}>
                            <h3 style={{ color: colors.secondary, marginBottom: '20px', borderBottom: `3px solid ${colors.primary}`, display: 'inline-block' }}>Project Specs</h3>
                            <form onSubmit={handleCalc}>
                                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>TOTAL BUDGET ($)</label>
                                <input style={inputStyle} type="number" placeholder="e.g. 50000" onChange={e => setInputs({ ...inputs, budget: e.target.value })} required />
                                
                                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>LOCATION</label>
                                <input style={inputStyle} placeholder="City or Region" onChange={e => setInputs({ ...inputs, location: e.target.value })} required />
                                
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>ROOMS</label>
                                        <input style={inputStyle} type="number" placeholder="Rooms" onChange={e => setInputs({ ...inputs, rooms: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>FAMILY</label>
                                        <input style={inputStyle} type="number" placeholder="Size" onChange={e => setInputs({ ...inputs, family: e.target.value })} required />
                                    </div>
                                </div>
                                
                                <div style={{ margin: '15px 0', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '13px' }}>Additional Requirements</h4>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}><input type="checkbox" onChange={e => setInputs({ ...inputs, hasVehicle: e.target.checked })} /> 🚗 Parking Space</label>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}><input type="checkbox" onChange={e => setInputs({ ...inputs, needsWater: e.target.checked })} /> 🚰 Water System</label>
                                    <label style={{ display: 'block', fontSize: '14px' }}><input type="checkbox" onChange={e => setInputs({ ...inputs, needsElectric: e.target.checked })} /> ⚡ Electricity Grid</label>
                                </div>

                                <button disabled={loading} style={{ ...inputStyle, background: colors.secondary, color: 'white', cursor: 'pointer', fontWeight: 'bold', border: 'none', transition: '0.3s' }}>
                                    {loading ? 'Analyzing Data...' : '🚀 GENERATE BLUEPRINT'}
                                </button>
                            </form>
                        </div>

                        {/* RIGHT SIDE: OUTPUTS */}
                        <div>
                            {result ? (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ color: colors.secondary }}>Project Analysis: {inputs.location}</h3>
                                        <span style={{ padding: '5px 12px', background: '#d1fae5', color: '#065f46', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ESTIMATION READY</span>
                                    </div>
                                    
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                                    <th style={{ padding: '12px', fontSize: '12px', color: '#64748b' }}>CATEGORY</th>
                                                    <th style={{ padding: '12px', fontSize: '12px', color: '#64748b' }}>SPECIFICATION</th>
                                                    <th style={{ padding: '12px', fontSize: '12px', color: '#64748b', textAlign: 'right' }}>COST</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.estimator.map((row, i) => (
                                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <td style={{ padding: '12px', fontSize: '13px', fontWeight: 'bold' }}>{row.category}</td>
                                                        <td style={{ padding: '12px', fontSize: '13px' }}>{row.item}<br/><small style={{ color: colors.primary }}>{row.qty}</small></td>
                                                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: colors.secondary }}>${row.cost.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <h4 style={{ marginTop: '30px', color: colors.secondary }}>📅 Construction Roadmap</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                        {result.phases.map((p, i) => (
                                            <div key={i} style={{ padding: '12px', borderLeft: `4px solid ${colors.primary}`, background: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{p.title}</span>
                                                    <span style={{ fontSize: '12px', color: colors.primary, fontWeight: 'bold' }}>{p.duration}</span>
                                                </div>
                                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>{p.task}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '25px', padding: '15px', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fef3c7', display: 'flex', gap: '15px' }}>
                                        <span style={{ fontSize: '20px' }}>💡</span>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#92400e', lineHeight: '1.5' }}><strong>Expert Advice:</strong> {result.advice}</p>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#cbd5e1', textAlign: 'center' }}>
                                    <span style={{ fontSize: '60px', marginBottom: '20px' }}>📊</span>
                                    <h4>Awaiting Input Parameters</h4>
                                    <p style={{ fontSize: '14px', maxWidth: '250px' }}>Fill in the project details on the left to generate your smart construction plan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '30px', color: '#94a3b8', fontSize: '12px' }}>&copy; 2026 Housify Pro Systems • PlymHack Version 2.0</p>
            </div>
        </div>
    );
}

export default App;