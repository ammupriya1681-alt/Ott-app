import { Router } from 'express';
import Movie from '../models/Movie.js';
import { auth } from '../middlewares/auth.js';

const r = Router();

// list with filters
r.get('/', async (req,res)=>{
  const { genre, query, page=1, limit=20 } = req.query;
  const q = {};
  if(genre) q.genre = genre;
  if(query) q.title = { $regex: query, $options:'i' };
  const docs = await Movie.find(q).sort({ createdAt:-1 }).skip((page-1)*limit).limit(Number(limit));
  res.json(docs);
});

r.get('/:id', async (req,res)=>{
  const doc = await Movie.findById(req.params.id);
  if(!doc) return res.status(404).json({ message:'Not found' });
  res.json(doc);
});

// stream meta (HLS url in real system is signed)
r.get('/:id/streams', auth, async (req,res)=>{
  const doc = await Movie.findById(req.params.id);
  if(!doc) return res.status(404).json({ message:'Not found' });
  const hls = doc.isSeries && doc.episodes?.length ? doc.episodes[0].hlsUrl : doc?.episodes?.[0]?.hlsUrl || doc.hlsUrl;
  res.json({ hlsUrl: hls || '' });
});

export default r;
