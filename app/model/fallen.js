'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const FallenSchema = new Schema({
    time: {
      type: Date,
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
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0,
      },
    },
  });
  return mongoose.model('Fallen', FallenSchema);
};
