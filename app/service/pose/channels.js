'use strict';

const Service = require('egg').Service;
const fs = require('fs');
class PoseChannelsService extends Service {
  // TODO: 从数据库获取数据
  async getChannels() {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    return settings.poseChannels;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    // TODO: id 与日海传感器管理的摄像头 id 对应，需要检查数据库 id 与这里的 id 有没有对上
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    settings.poseChannels = [ ...arr ];
    const str = JSON.stringify(settings);
    fs.writeFileSync('./config/monitoring.settings.json', str);
  }
}

module.exports = PoseChannelsService;
