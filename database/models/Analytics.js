import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  event: {
    type: String,
    required: true,
  },
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  metadata: mongoose.Schema.Types.Mixed,
});

AnalyticsSchema.index({ timestamp: -1 });
AnalyticsSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model('Analytics', AnalyticsSchema);
