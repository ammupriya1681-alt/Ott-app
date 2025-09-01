import mongoose from 'mongoose';
const episodeSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  hlsUrl: String
}, { _id: false });
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: [String],
  year: Number,
  poster: String,
  banner: String,
  isSeries: { type: Boolean, default: false },
  episodes: [episodeSchema]
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);
