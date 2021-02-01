'use strict';

// FIXME: WORKED HERE~
// const res = await this.ctx.model.Config.create({});
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ConfigSchema = new Schema({
    // 行为识别模块配置
    pose_interval: {
      type: Number,
      default: 5,
    },
    pose_channels: {
      type: Array,
      default: [],
    },
    pose_prowler_min_time: {
      type: Number,
      default: 2,
    },
    // 人流算法配置
    peopleflow_channels: {
      id: {
        type: Number,
        default: -1,
      },
      location: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
  });
  return mongoose.model('Config', ConfigSchema);
};
