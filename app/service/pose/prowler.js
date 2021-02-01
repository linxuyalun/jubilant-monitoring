'use strict';

const Service = require('egg').Service;

class PoseProwlerService extends Service {
  // TODO: 从数据库获取数据
  async getMinTime() {
    return {
      interval: 5,
    };
  }

  async setMinTime(interval) {
    // TODO: 修改数据库 interval 参数
    console.log(interval);
  }

  // TODO: 从数据库获取数据
  async statistics() {
    // FIXME: Mock data here
    // id = 0 是所有摄像头合计值
    // quantity 是报警消息数量
    const arr = [
      {
        id: 0,
        location: 'wow',
        quantity: 3,
      },
      {
        id: 1,
        location: 'wow',
        quantity: 2,
      },
    ];
    return arr;
  }

  async message(pageIndex, pageSize, channelId, startTime, endTime) {
    console.log(pageIndex, pageSize, channelId, startTime, endTime);
    return {
      total: 24,
      size: 2,
      data: [
        {
          time: '2021-01-27 14:17:35',
          channelId: 1,
          location: '大门',
          peopleId: 12,
          images: {
            person: 'tommy',
            scene: 'wow',
          },
          bbox: {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
          },
        },
        {
          time: '2021-01-27 14:19:35',
          channelId: 1,
          location: '侧门',
          peopleId: 12,
          images: {
            person: 'tommy',
            scene: 'wow',
          },
          bbox: {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
          },
        },
      ],
    };
  }
}

module.exports = PoseProwlerService;
