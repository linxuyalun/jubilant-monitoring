'use strict';

const Service = require('egg').Service;

class PeopleflowStatusService extends Service {
  async getStatus() {
    const raw = await this.app.redis.get('peopleflowStatus');
    return raw === 'true';
  }


  async setStatus(isRunning) {
    await this.app.redis.set('peopleflowStatus', isRunning ? 'true' : 'false');
  }
}

module.exports = PeopleflowStatusService;
