'use strict';

const Service = require('egg').Service;

const fs = require('fs');
class PoseIntervalService extends Service {
  async getInterval() {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    return {
      interval: settings.poseInterval,
    };
  }

  async setInterval(interval) {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    settings.poseInterval = interval;
    const str = JSON.stringify(settings);
    fs.writeFileSync('./config/monitoring.settings.json', str);
  }
}

module.exports = PoseIntervalService;
