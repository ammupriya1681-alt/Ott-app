import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import api from './lib/axios'

function useAuth(){
  const [user,setUser]=React.useState(()=>JSON.parse(localStorage.getItem('user')||'null'));
  const login=async (email,password)=>{
    const {data}=await api.post('/api/auth/login',{email,password});
    localStorage.setItem('token',data.token); localStorage.setItem('user',JSON.stringify(data.user));
    setUser(data.user);
  };
  const register=async (email,password)=>{
    const {data}=await api.post('/api/auth/register',{email,password});
    localStorage.setItem('token',data.token); localStorage.setItem('user',JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout=()=>{ localStorage.clear(); setUser(null); };
  return {user,login,register,logout};
}

function Home(){
  const [list,setList]=React.useState([]);
  React.useEffect(()=>{ api.get('/api/movies').then(r=>setList(r.data)); },[]);
  return <div>
    <h2>Browse</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
      {list.map(m=><Link key={m._id} to={`/movie/${m._id}`}><div style={{border:'1px solid #eee',padding:8}}>{m.title}</div></Link>)}
    </div>
  </div>
}

function Details(){
  const {id}=useParams();
  const [data,setData]=React.useState(null);
  React.useEffect(()=>{ api.get(`/api/movies/${id}`).then(r=>setData(r.data)); },[id]);
  if(!data) return '...';
  return <div>
    <h2>{data.title}</h2>
    <p>{data.description}</p>
    <Link to={`/watch/${data._id}`}>▶ Play</Link>
  </div>;
}

function Player(){
  const {id}=useParams();
  const ref=React.useRef(null);
  React.useEffect(()=>{
    (async()=>{
      const {data}=await api.get(`/api/movies/${id}/streams`);
      if(!data.hlsUrl){ ref.current.innerText='No stream url set'; return; }
      const Hls=(await import('hls.js')).default;
      const video=document.createElement('video'); video.controls=true; video.style.width='100%'; ref.current.appendChild(video);
      if(Hls.isSupported()){ const hls=new Hls(); hls.loadSource(data.hlsUrl); hls.attachMedia(video); }
      else{ video.src=data.hlsUrl; }
    })();
  },[id]);
  return <div ref={ref}></div>;
}

function Auth(){
  const nav=useNavigate(); const a=useAuth();
  const [email,setEmail]=React.useState('user@test.com');
  const [password,setPassword]=React.useState('password');
  return <div>
    <h2>Login / Register</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/><br/>
    <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/><br/>
    <button onClick={()=>a.login(email,password).then(()=>nav('/'))}>Login</button>
    <button onClick={()=>a.register(email,password).then(()=>nav('/'))}>Register</button>
  </div>
}

function App(){
  const a=useAuth();
  return <BrowserRouter>
    <div style={{display:'flex',gap:12,padding:12, borderBottom:'1px solid #eee'}}>
      <Link to="/">Home</Link>
      <Link to="/auth">Auth</Link>
      {a.user && <button onClick={a.logout}>Logout</button>}
    </div>
    <div style={{padding:12}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/movie/:id" element={<Details/>}/>
        <Route path="/watch/:id" element={<Player/>}/>
      </Routes>
    </div>
  </BrowserRouter>
}

createRoot(document.getElementById('root')).render(<App/>)
