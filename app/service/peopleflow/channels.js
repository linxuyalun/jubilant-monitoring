'use strict';

const Service = require('egg').Service;

class PeopleflowChannelsService extends Service {
  // TODO: 从数据库获取数据
  async getChannels() {
    const data = {
      id: 1,
      location: '大门',
      url: 'rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream',
    };
    return data;
  }


  async setChannels(data) {
    // 检查 channels
    // TODO: id 与日海传感器管理的摄像头 id 对应，需要检查数据库 id 与这里的 id 有没有对上
    console.log(data);
    // TODO: 修改数据库 channels
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
