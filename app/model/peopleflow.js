'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PeopleflowSchema = new Schema({
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
    in: {
      type: Number,
      required: true,
    },
    out: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    x: {
      type: [ Number ],
      required: true,
    },
    y: {
      type: [ Number ],
      required: true,
    },
  });
  return mongoose.model('Peopleflow', PeopleflowSchema);
};
