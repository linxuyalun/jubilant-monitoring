'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class PeopleflowChannelsService extends Service {
  async getChannels() {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    return settings.peopleflowChannels;
  }


  async setChannels(data) {
    // 检查 channels
    const raw = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(raw);
    settings.peopleflowChannels = data;
    const str = JSON.stringify(settings);
    fs.writeFileSync('./config/monitoring.settings.json', str);
  }
}

module.exports = PeopleflowChannelsService;
