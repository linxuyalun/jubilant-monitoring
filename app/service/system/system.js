'use strict';

const Service = require('egg').Service;

class SystemService extends Service {
  async getMode() {
    let mode = await this.app.redis.get('mode');
    if (!mode) {
      await this.app.redis.set('mode', '0');
      mode = '0';
    }
    return Number(mode);
  }

  async setMode(mode) {
    await this.app.redis.set('mode', mode);
  }

}

module.exports = SystemService;
