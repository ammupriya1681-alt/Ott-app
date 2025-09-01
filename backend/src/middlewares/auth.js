import jwt from 'jsonwebtoken';
export const auth = (req, res, next)=>{
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if(!token) return res.status(401).json({ message:'No token' });
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  }catch(err){
    return res.status(401).json({ message:'Invalid token' });
  }
};
export const role = (r)=> (req, res, next)=>{
  if(!req.user || req.user.role !== r) return res.status(403).json({ message:'Forbidden' });
  next();
};
