'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const FallenSchema = new Schema({
    time: {
      type: Date,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    channelId: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    images: {
      person: {
        type: String,
        default: '',
      },
      scene: {
        type: String,
        default: '',
      },
    },
    bbox: {
      x0: {
        type: Number,
        default: 0,
      },
      y0: {
        type: Number,
        default: 0,
      },
      x1: {
        type: Number,
        default: 0,
      },
      y1: {
        type: Number,
        default: 0,
      },
    },
  });
  return mongoose.model('Fallen', FallenSchema);
};
