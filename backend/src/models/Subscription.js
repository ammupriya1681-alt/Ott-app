import mongoose from 'mongoose';
const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: { type: String, enum: ['BASIC','STANDARD','PREMIUM'] },
  active: { type: Boolean, default: false },
  expiry: Date
}, { timestamps: true });
export default mongoose.model('Subscription', subscriptionSchema);
