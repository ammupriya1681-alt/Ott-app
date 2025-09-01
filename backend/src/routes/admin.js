import { Router } from 'express';
import { auth, role } from '../middlewares/auth.js';
import Movie from '../models/Movie.js';

const r = Router();

r.use(auth, role('admin'));

r.get('/stats', async (_req,res)=>{
  const [movies, users] = await Promise.all([ Movie.countDocuments(), 0 ]);
  res.json({ movies, users, activeSubscriptions: 0 });
});

r.post('/movies', async (req,res)=>{
  const m = await Movie.create(req.body);
  res.status(201).json(m);
});
r.put('/movies/:id', async (req,res)=>{
  const m = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(m);
});
r.delete('/movies/:id', async (req,res)=>{
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
