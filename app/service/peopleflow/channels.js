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
    // TODO: id 与日海传感器管理的摄像头 id 对应，需要检查数据库 id 与这里的 id 有没有对上
    const raw = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(raw);
    settings.peopleflowChannels = data;
    const str = JSON.stringify(settings);
    fs.writeFileSync('./config/monitoring.settings.json', str);
  }

  async monitoring() {
    const data = {
      id: 1,
      time: '2021-01-27 15:17:35',
      location: '大门',
      in: 12,
      out: 14,
      total: 8,
      x: [ 12, 15, 49, 12, 23, 49, 60, 90 ],
      y: [ 12, 15, 49, 12, 23, 49, 60, 90 ],
    };
    return data;
  }
}

module.exports = PeopleflowChannelsService;
