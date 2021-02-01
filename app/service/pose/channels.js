'use strict';

const Service = require('egg').Service;

class PoseChannelsService extends Service {
  // TODO: 从数据库获取数据
  async getChannels() {
    const data = [
      {
        id: 1,
        location: '大门',
        url: 'rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream',
      },
    ];
    return data;
  }

  /**
   * @param {array} arr 摄像头配置，传进的 arr 数据直接覆盖旧数据
   */
  async setChannels(arr) {
    // 检查 channels
    // TODO: id 与日海传感器管理的摄像头 id 对应，需要检查数据库 id 与这里的 id 有没有对上
    console.log(arr);
    // TODO: 修改数据库 channels
  }
}

module.exports = PoseChannelsService;
