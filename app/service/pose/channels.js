'use strict';

const Service = require('egg').Service;
class PoseChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get('poseChannels');
    const poseChannels = JSON.parse(raw);
    if (!poseChannels) {
      await this.app.redis.set('poseChannels', '[]');
      return [];
    }
    return poseChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    await this.app.redis.set('poseChannels', JSON.stringify(arr));
  }
}

module.exports = PoseChannelsService;
