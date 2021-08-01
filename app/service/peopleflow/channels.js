'use strict';

const Service = require('egg').Service;

const { REDIS_STATUS } = require('../../constant.js');

class PeopleflowChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get(REDIS_STATUS.PEOPLEFLOW_CHANNELS);
    const peopleflowChannels = JSON.parse(raw);
    if (!peopleflowChannels) {
      await this.app.redis.set(REDIS_STATUS.PEOPLEFLOW_CHANNELS, '[]');
      return [];
    }
    return peopleflowChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    await this.app.redis.set(REDIS_STATUS.PEOPLEFLOW_CHANNELS, JSON.stringify(arr));
  }
}

module.exports = PeopleflowChannelsService;
