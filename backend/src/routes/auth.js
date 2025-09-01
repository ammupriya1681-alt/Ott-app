import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { hash, match } from '../utils/hash.js';

const r = Router();

r.post('/register', async (req,res)=>{
  const { email, password, name } = req.body;
  if(!email || !password) return res.status(400).json({ message:'email & password required' });
  const exists = await User.findOne({ email });
  if(exists) return res.status(409).json({ message:'Email already used' });
  const user = await User.create({ email, password: await hash(password), name });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user: { id: user._id, email, name, role: user.role } });
});

r.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user || !(await match(password, user.password)))
    return res.status(401).json({ message:'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
});

export default r;
