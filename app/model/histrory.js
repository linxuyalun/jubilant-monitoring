'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const HistorySchema = new Schema({
    time: {
      type: Date,
    },
    policy: {
      type: String,
    },
    success: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    deletedCount: {
      fallen: {
        type: Number,
        default: 0,
      },
      prowler: {
        type: Number,
        default: 0,
      },
      tracking: {
        type: Number,
        default: 0,
      },
      peopleflow: {
        type: Number,
        default: 0,
      },
    },
  });
  return mongoose.model('History', HistorySchema);
};
