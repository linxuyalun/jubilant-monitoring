'use strict';

const Service = require('egg').Service;

class PoseStatusService extends Service {
  async getStatus() {
    const raw = await this.app.redis.get('poseStatus');
    return raw === 'true';
  }


  async setStatus(isRunning) {
    await this.app.redis.set('poseStatus', isRunning ? 'true' : 'false');
  }
}

module.exports = PoseStatusService;
