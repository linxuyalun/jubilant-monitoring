'use strict';

const Service = require('egg').Service;

const channelName = 'peopleflowChannels';
class PeopleflowChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get(channelName);
    const peopleflowChannels = JSON.parse(raw);
    if (!peopleflowChannels) {
      await this.app.redis.set(channelName, '[]');
      return [];
    }
    return peopleflowChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    await this.app.redis.set(channelName, JSON.stringify(arr));
  }
}

module.exports = PeopleflowChannelsService;
