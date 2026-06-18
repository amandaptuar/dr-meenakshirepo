import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

// ─── Admin credentials (hardcoded) ───────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'drmeenakshi@2024';

// ─── Helpers ─────────────────────────────────────────────────
const scoreColor = s => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : s >= 40 ? '#f97316' : '#ef4444';
const impactColor = v => v === 0 ? '#10b981' : v === 1 ? '#f59e0b' : '#ef4444';
const initials = n => n ? n.split(' ').map(x => x[0]).join('').toUpperCase().slice(0,2) : '?';
const avatarColors = ['#d4143a','#3b82f6','#10b981','#f59e0b','#8b5cf6','#ec4899'];
const avatarColor = (n='') => avatarColors[n.charCodeAt(0) % avatarColors.length];

export default function AdminDashboard() {
  const [authed, setAuthed]       = useState(() => sessionStorage.getItem('adminAuth') === '1');
  const [loginForm, setLoginForm] = useState({ user:'', pass:'' });
  const [loginErr, setLoginErr]   = useState('');
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [selected, setSelected]   = useState(null); // selected user for detail view
  const [search, setSearch]       = useState('');

  useEffect(() => { if (authed) fetchUsers(); }, [authed]);

  const [fetchError, setFetchError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    console.log('Admin fetch result:', { data, error });
    if (error) {
      setFetchError(error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.user === ADMIN_USER && loginForm.pass === ADMIN_PASS) {
      sessionStorage.setItem('adminAuth','1');
      setAuthed(true);
    } else {
      setLoginErr('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setAuthed(false);
    setSelected(null);
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ── LOGIN SCREEN ────────────────────────────────────────────
  if (!authed) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f172a,#1e293b)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ background:'#fff', borderRadius:'20px', padding:'48px 40px', width:'100%', maxWidth:'420px', boxShadow:'0 25px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ width:'64px', height:'64px', background:'linear-gradient(135deg,#d4143a,#ff6b6b)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'28px' }}>🔐</div>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'#0f172a', margin:0, fontFamily:"'Inter',sans-serif", letterSpacing:'-0.03em' }}>Admin Portal</h1>
          <p style={{ color:'#64748b', marginTop:'8px', fontSize:'16px', fontFamily:"'Inter',sans-serif", lineHeight:1.6 }}>Dr. Meenakshi Jain — Cognitive Assessment Platform</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block', fontSize:'15px', fontWeight:600, color:'#374151', marginBottom:'8px', fontFamily:"'Inter',sans-serif" }}>Username</label>
            <input required value={loginForm.user} onChange={e=>setLoginForm({...loginForm,user:e.target.value})}
              placeholder="Enter admin username"
              style={{ width:'100%', padding:'13px 16px', border:'2px solid #e5e7eb', borderRadius:'10px', fontSize:'16px', outline:'none', boxSizing:'border-box', transition:'border 0.2s', fontFamily:"'Inter',sans-serif" }}
              onFocus={e=>e.target.style.borderColor='#d4143a'} onBlur={e=>e.target.style.borderColor='#e5e7eb'} />
          </div>
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', fontSize:'15px', fontWeight:600, color:'#374151', marginBottom:'8px', fontFamily:"'Inter',sans-serif" }}>Password</label>
            <input required type="password" value={loginForm.pass} onChange={e=>setLoginForm({...loginForm,pass:e.target.value})}
              placeholder="Enter admin password"
              style={{ width:'100%', padding:'13px 16px', border:'2px solid #e5e7eb', borderRadius:'10px', fontSize:'16px', outline:'none', boxSizing:'border-box', transition:'border 0.2s', fontFamily:"'Inter',sans-serif" }}
              onFocus={e=>e.target.style.borderColor='#d4143a'} onBlur={e=>e.target.style.borderColor='#e5e7eb'} />
          </div>
          {loginErr && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#b91c1c', padding:'12px 16px', borderRadius:'8px', fontSize:'15px', marginBottom:'16px', fontFamily:"'Inter',sans-serif" }}>{loginErr}</div>}
          <button type="submit" style={{ width:'100%', padding:'15px', background:'linear-gradient(135deg,#d4143a,#ff6b6b)', color:'#fff', border:'none', borderRadius:'10px', fontSize:'17px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif", letterSpacing:'-0.01em' }}>
            Sign In to Admin
          </button>
        </form>
      </div>
    </div>
  );

  // ── USER DETAIL VIEW ────────────────────────────────────────
  if (selected) {
    const ad = selected.latest_assessment_data;
    const radarData = ad ? ad.charts.radarDomains.labels.map((l,i) => ({ subject: l.replace(/([A-Z])/g,' $1').trim(), A: ad.charts.radarDomains.values[i], fullMark:100 })) : [];
    const barData = ad ? ad.charts.barLifestyleImpacts.labels.map((l,i) => ({ name: l.replace('Impact','').replace(/([A-Z])/g,' $1').trim(), Impact: ad.charts.barLifestyleImpacts.values[i] })) : [];
    const cogAge = ad ? (ad.cognitiveAge.estimatedCognitiveAge !== null ? ad.cognitiveAge.estimatedCognitiveAge : Math.round(ad.cognitiveAge.actualAge + ((70 - ad.overall.score)*0.4))) : null;

    return (
      <div style={{ minHeight:'100vh', background:'#f8fafc', paddingTop:'80px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 20px 60px' }}>
          {/* Back */}
          <button onClick={()=>setSelected(null)} style={{ display:'flex', alignItems:'center', gap:'8px', background:'#fff', border:'1px solid #e2e8f0', padding:'10px 20px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontWeight:600, color:'#374151', marginBottom:'32px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Users
          </button>

          {/* User Header Card */}
          <div style={{ background:'#fff', borderRadius:'16px', padding:'32px', marginBottom:'28px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap' }}>
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:`linear-gradient(135deg,${avatarColor(selected.name)},${avatarColor(selected.name)}99)`, color:'#fff', fontSize:'24px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {initials(selected.name)}
            </div>
            <div style={{ flex:1 }}>
              <h2 style={{ margin:0, fontSize:'22px', fontWeight:800, color:'#0f172a' }}>{selected.name}</h2>
              <p style={{ margin:'4px 0 0', color:'#64748b', fontSize:'14px' }}>{selected.email}</p>
              <div style={{ display:'flex', gap:'8px', marginTop:'10px', flexWrap:'wrap' }}>
                <span style={{ background:'#f1f5f9', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:600, color:'#475569' }}>Age: {selected.age}</span>
                <span style={{ background:'#f1f5f9', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:600, color:'#475569', textTransform:'capitalize' }}>{selected.gender}</span>
                <span style={{ background:'#f1f5f9', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:600, color:'#475569' }}>Joined: {new Date(selected.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            {selected.latest_pdf_base64 && (
              <button onClick={()=>window.open(selected.latest_pdf_base64,'_blank')} style={{ background:'linear-gradient(135deg,#d4143a,#ff6b6b)', color:'#fff', border:'none', padding:'12px 24px', borderRadius:'10px', fontWeight:700, cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', gap:'8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                View PDF Report
              </button>
            )}
          </div>

          {!ad ? (
            <div style={{ background:'#fff', borderRadius:'16px', padding:'40px', textAlign:'center', color:'#94a3b8', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>📋</div>
              <p>This user has not completed their assessment yet.</p>
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'16px', marginBottom:'28px' }}>
                {[
                  { label:'Wellness Score', val: ad.overall.score.toFixed(0), sub: ad.overall.rating, color: scoreColor(ad.overall.score) },
                  { label:'Chronological Age', val: ad.cognitiveAge.actualAge, sub:'Years Old', color:'#d4143a' },
                  { label:'Cognitive Age', val: cogAge, sub:'Estimated', color:'#3b82f6' },
                ].map((k,i) => (
                  <div key={i} style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', borderTop:`4px solid ${k.color}` }}>
                    <div style={{ fontSize:'12px', textTransform:'uppercase', color:'#94a3b8', fontWeight:600, letterSpacing:'1px' }}>{k.label}</div>
                    <div style={{ fontSize:'36px', fontWeight:800, color:k.color, margin:'8px 0 4px' }}>{k.val}</div>
                    <div style={{ fontSize:'13px', color:'#64748b' }}>{k.sub}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px', marginBottom:'28px' }}>
                <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin:'0 0 20px', color:'#0f172a', fontSize:'16px' }}>Cognitive Domains</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#eee"/><PolarAngleAxis dataKey="subject" tick={{fill:'#666',fontSize:10}}/>
                      <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fontSize:9,fill:'#aaa'}}/>
                      <Radar dataKey="A" stroke="#d4143a" fill="#d4143a" fillOpacity={0.35}/><Tooltip/>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin:'0 0 4px', color:'#0f172a', fontSize:'16px' }}>Lifestyle Impacts</h3>
                  <p style={{ margin:'0 0 16px', color:'#94a3b8', fontSize:'12px' }}>Lower is better</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={barData} margin={{top:10,right:10,left:-20,bottom:5}}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee"/>
                      <XAxis dataKey="name" tick={{fontSize:10,fill:'#666'}} axisLine={false} tickLine={false}/>
                      <YAxis domain={[0,2]} ticks={[0,1,2]} tickFormatter={v=>['Low','Mod','High'][v]} tick={{fontSize:9,fill:'#888'}} axisLine={false} tickLine={false}/>
                      <Tooltip formatter={v=>['Low','Moderate','High Impact'][v]}/>
                      <Bar dataKey="Impact" radius={[4,4,0,0]}>
                        {barData.map((_,i)=><Cell key={i} fill={impactColor(_.Impact)}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strengths & Recommendations */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'20px' }}>
                {ad.strengths?.length > 0 && (
                  <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', borderLeft:'4px solid #10b981' }}>
                    <h3 style={{ color:'#10b981', margin:'0 0 16px', fontSize:'15px' }}>Key Strengths</h3>
                    <ul style={{ margin:0, paddingLeft:'20px', color:'#374151', lineHeight:1.8, fontSize:'14px' }}>
                      {ad.strengths.map((s,i)=><li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {ad.recommendations?.length > 0 && (
                  <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', borderLeft:'4px solid #3b82f6' }}>
                    <h3 style={{ color:'#3b82f6', margin:'0 0 16px', fontSize:'15px' }}>Recommendations</h3>
                    <ul style={{ margin:0, paddingLeft:'20px', color:'#374151', lineHeight:1.8, fontSize:'14px' }}>
                      {ad.recommendations.map((r,i)=><li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── USER LIST (MAIN ADMIN DASHBOARD) ───────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', paddingTop:'80px', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px 60px' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'36px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <h1 style={{ margin:0, fontSize:'32px', fontWeight:800, color:'#0f172a', fontFamily:"'Inter',sans-serif", letterSpacing:'-0.03em' }}>Admin Dashboard</h1>
            <p style={{ margin:'6px 0 0', color:'#64748b', fontSize:'17px', fontFamily:"'Inter',sans-serif" }}>{users.length} registered users</p>
          </div>
          <div style={{ display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap' }}>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search users..."
              style={{ padding:'10px 16px', border:'1px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', outline:'none', width:'220px' }}
            />
            <button onClick={fetchUsers} style={{ background:'#f1f5f9', border:'1px solid #e2e8f0', padding:'10px 18px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontWeight:600, color:'#475569' }}>↻ Refresh</button>
            <button onClick={handleLogout} style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#b91c1c', padding:'10px 18px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontWeight:600 }}>Logout</button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'80px', color:'#64748b' }}>Loading users...</div>
        ) : fetchError ? (
          <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'12px', padding:'32px', textAlign:'center' }}>
            <div style={{ fontSize:'32px', marginBottom:'12px' }}>⚠️</div>
            <h3 style={{ color:'#b91c1c', margin:'0 0 8px' }}>Database Error — RLS is blocking reads</h3>
            <p style={{ color:'#991b1b', fontSize:'14px', marginBottom:'16px' }}>{fetchError}</p>
            <div style={{ background:'#fff', border:'1px solid #fecaca', borderRadius:'8px', padding:'16px', textAlign:'left', maxWidth:'560px', margin:'0 auto 16px' }}>
              <strong style={{ fontSize:'13px', color:'#7f1d1d' }}>Fix: Run this in Supabase SQL Editor</strong>
              <pre style={{ background:'#fff5f5', padding:'12px', borderRadius:'6px', fontSize:'12px', color:'#7f1d1d', marginTop:'10px', whiteSpace:'pre-wrap' }}>
DROP POLICY IF EXISTS "Enable read for users based on id" ON public.users;
CREATE POLICY "Allow all reads" ON public.users FOR SELECT USING (true);</pre>
            </div>
            <button onClick={fetchUsers} style={{ background:'#d4143a', color:'#fff', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontWeight:600 }}>↻ Retry</button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'20px' }}>
            {filtered.map(u => (
              <div key={u.id} onClick={()=>setSelected(u)} style={{ background:'#fff', borderRadius:'16px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', cursor:'pointer', transition:'all 0.2s', border:'2px solid transparent' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#d4143a';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(212,20,58,0.12)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)'}}>

                {/* Avatar + Name */}
                <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'18px' }}>
                  <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:`linear-gradient(135deg,${avatarColor(u.name)},${avatarColor(u.name)}88)`, color:'#fff', fontWeight:800, fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {initials(u.name)}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, color:'#0f172a', fontSize:'16px' }}>{u.name}</div>
                    <div style={{ color:'#94a3b8', fontSize:'13px', marginTop:'2px' }}>{u.email}</div>
                  </div>
                </div>

                {/* Info pills */}
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'16px' }}>
                  <span style={{ background:'#f1f5f9', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', color:'#475569', fontWeight:600 }}>Age {u.age}</span>
                  <span style={{ background:'#f1f5f9', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', color:'#475569', fontWeight:600, textTransform:'capitalize' }}>{u.gender}</span>
                  <span style={{ background:'#f1f5f9', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', color:'#475569' }}>{new Date(u.created_at).toLocaleDateString()}</span>
                </div>

                {/* Assessment score or pending */}
                {u.latest_assessment_data ? (
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', borderRadius:'10px', padding:'12px 16px' }}>
                    <div>
                      <div style={{ fontSize:'11px', textTransform:'uppercase', color:'#94a3b8', fontWeight:600 }}>Wellness Score</div>
                      <div style={{ fontSize:'22px', fontWeight:800, color: scoreColor(u.latest_assessment_data.overall.score) }}>
                        {u.latest_assessment_data.overall.score.toFixed(0)}<span style={{ fontSize:'13px', color:'#94a3b8', fontWeight:400 }}>/100</span>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:'12px', color:'#64748b', fontWeight:600 }}>{u.latest_assessment_data.overall.rating}</div>
                      {u.latest_pdf_base64 && <div style={{ fontSize:'11px', color:'#10b981', marginTop:'4px' }}>✓ PDF Ready</div>}
                    </div>
                  </div>
                ) : (
                  <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#92400e' }}>
                    ⏳ Assessment not completed
                  </div>
                )}

                <div style={{ marginTop:'14px', textAlign:'right', fontSize:'13px', color:'#d4143a', fontWeight:600 }}>
                  View Details →
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px', color:'#94a3b8' }}>
                <div style={{ fontSize:'40px', marginBottom:'12px' }}>👥</div>
                <p>No users found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
