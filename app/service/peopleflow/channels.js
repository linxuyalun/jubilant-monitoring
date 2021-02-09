'use strict';

const Service = require('egg').Service;

class PeopleflowChannelsService extends Service {
  async getChannels() {
    const raw = await this.app.redis.get('peopleflowChannel');
    const peopleflowChannel = JSON.parse(raw);
    if (!peopleflowChannel) {
      await this.app.redis.set('peopleflowChannel', '{}');
      return {};
    }
    return peopleflowChannel;
  }


  async setChannels(data) {
    await this.app.redis.set('peopleflowChannel', JSON.stringify(data));
  }
}

module.exports = PeopleflowChannelsService;
