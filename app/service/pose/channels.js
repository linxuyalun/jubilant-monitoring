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
    arr.map(item => {
      if (typeof item.id !== 'number' || item.id % 1 === 0) {
        throw new Error('参数 id 类型必须为 number 且为整数');
      }
      console.log('hi');
      /**
       * type = 1，姿态（fallen）
       * type = 2，徘徊（prowler）
       * type = 3，两者皆有
       */
      if (typeof item.type !== 'number' || (item.type > 3 || item.type < 1)) {
        throw new Error('参数 type 类型必须为 number 且只能为 1，2，3');
      }
      console.log('haa');
      return item;
    });

    // TODO: 修改数据库 channels
  }
}

module.exports = PoseChannelsService;
