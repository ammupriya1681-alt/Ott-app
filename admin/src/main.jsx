import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import api from './lib/axios'

function Login(){
  const nav=useNavigate(); const [email,setEmail]=React.useState('admin@test.com'); const [password,setPassword]=React.useState('password');
  const onLogin=async()=>{
    const {data}=await api.post('/api/auth/login',{email,password});
    if(data.user.role!=='admin') alert('Not admin'); else { localStorage.setItem('token',data.token); nav('/'); }
  };
  return <div style={{padding:24}}>
    <h2>Admin Login</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)}/><br/>
    <input value={password} onChange={e=>setPassword(e.target.value)} type="password"/><br/>
    <button onClick={onLogin}>Login</button>
  </div>
}
function Dashboard(){
  const [stats,setStats]=React.useState(null);
  React.useEffect(()=>{ api.get('/api/admin/stats').then(r=>setStats(r.data)); },[]);
  return <div style={{padding:24}}>
    <h2>Dashboard</h2>
    <pre>{JSON.stringify(stats,null,2)}</pre>
    <Movies/>
  </div>
}
function Movies(){
  const [list,setList]=React.useState([]);
  const [title,setTitle]=React.useState('Demo Movie');
  const load=()=> api.get('/api/movies').then(r=>setList(r.data));
  React.useEffect(load,[]);
  const create=async()=>{ await api.post('/api/admin/movies',{title}); load(); };
  const remove=async(id)=>{ await api.delete('/api/admin/movies/'+id); load(); };
  return <div>
    <h3>Movies</h3>
    <input value={title} onChange={e=>setTitle(e.target.value)} /><button onClick={create}>Create</button>
    <ul>{list.map(m=><li key={m._id}>{m.title} <button onClick={()=>remove(m._id)}>Delete</button></li>)}</ul>
  </div>
}
function App(){
  return <BrowserRouter>
    <div style={{display:'flex',gap:12,padding:12, borderBottom:'1px solid #eee'}}>
      <Link to="/">Dashboard</Link>
      <Link to="/login">Login</Link>
    </div>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
}
createRoot(document.getElementById('root')).render(<App/>)
