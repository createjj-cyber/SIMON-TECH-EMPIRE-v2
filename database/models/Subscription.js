import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
  },
  startDate: Date,
  endDate: Date,
  price: Number,
  currency: {
    type: String,
    default: 'USD',
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Subscription', SubscriptionSchema);
