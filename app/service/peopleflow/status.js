'use strict';

const Service = require('egg').Service;
const { REDIS_STATUS } = require('../../constant.js');

class PeopleflowStatusService extends Service {
  async getStatus() {
    const raw = await this.app.redis.get(REDIS_STATUS.PEOPLEFLOW_STATUS);
    return raw === 'true';
  }


  async setStatus(isRunning) {
    await this.app.redis.set(REDIS_STATUS.PEOPLEFLOW_STATUS, isRunning ? 'true' : 'false');
  }
}

module.exports = PeopleflowStatusService;
