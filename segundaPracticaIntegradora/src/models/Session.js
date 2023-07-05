import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
});

export const sessionsModel = mongoose.model('Sessions', sessionsSchema);
