import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, default: 'user', enum: ['user','admin'] },
  activePlan: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
