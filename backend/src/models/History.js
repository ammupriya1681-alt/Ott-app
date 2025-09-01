import mongoose from 'mongoose';
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  progress: { type: Number, default: 0 } // seconds
}, { timestamps: true });
export default mongoose.model('History', historySchema);
