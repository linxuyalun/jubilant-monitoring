'use strict';

const Service = require('egg').Service;
const { REDIS_STATUS } = require('../../constant.js');

class PoseChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get(REDIS_STATUS.POSE_CHANNELS);
    const poseChannels = JSON.parse(raw);
    if (!poseChannels) {
      await this.app.redis.set(REDIS_STATUS.POSE_CHANNELS, '[]');
      return [];
    }
    return poseChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    await this.app.redis.set(REDIS_STATUS.POSE_CHANNELS, JSON.stringify(arr));
  }
}

module.exports = PoseChannelsService;
