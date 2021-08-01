'use strict';

const Service = require('egg').Service;
const { REDIS_STATUS } = require('../../constant.js');

class PoseStatusService extends Service {
  async getStatus() {
    const raw = await this.app.redis.get(REDIS_STATUS.POSE_STATUS);
    return raw === 'true';
  }


  async setStatus(isRunning) {
    await this.app.redis.set(REDIS_STATUS.POSE_STATUS, isRunning ? 'true' : 'false');
  }
}

module.exports = PoseStatusService;
