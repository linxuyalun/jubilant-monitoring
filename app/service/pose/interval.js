'use strict';

const Service = require('egg').Service;

class PoseIntervalService extends Service {
  // TODO: 从数据库获取数据
  async getInterval() {
    return {
      interval: 5,
    };
  }

  async setInterval(interval) {
    // TODO: 修改数据库 interval 参数
    console.log(interval);
  }
}

module.exports = PoseIntervalService;
