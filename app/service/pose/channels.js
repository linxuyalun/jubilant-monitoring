'use strict';

const Service = require('egg').Service;

const channelName = 'poseChannels';
class PoseChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get(channelName);
    const poseChannels = JSON.parse(raw);
    if (!poseChannels) {
      await this.app.redis.set(channelName, '[]');
      return [];
    }
    return poseChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    await this.app.redis.set(channelName, JSON.stringify(arr));
  }
}

module.exports = PoseChannelsService;
