import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['info', 'warn', 'error', 'debug'],
    required: true,
  },
  message: String,
  error: mongoose.Schema.Types.Mixed,
  userId: mongoose.Schema.Types.ObjectId,
  sessionId: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

LogSchema.index({ timestamp: -1 });
LogSchema.index({ level: 1, timestamp: -1 });

export default mongoose.model('Logs', LogSchema);
