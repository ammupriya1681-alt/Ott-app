import { Router } from 'express';
import History from '../models/History.js';
import { auth } from '../middlewares/auth.js';
const r = Router();

r.get('/history', auth, async (req,res)=>{
  const data = await History.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json(data);
});

r.post('/history', auth, async (req,res)=>{
  const { movie, progress } = req.body;
  let row = await History.findOne({ user: req.user.id, movie });
  if(!row) row = await History.create({ user: req.user.id, movie, progress });
  else { row.progress = progress; await row.save(); }
  res.json(row);
});

export default r;
