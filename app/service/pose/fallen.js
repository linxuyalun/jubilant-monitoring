'use strict';

const Service = require('egg').Service;

class PoseFallenService extends Service {
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
        id: 2,
        location: 'wow',
        quantity: 2,
      },
    ];
    return arr;
  }
}

module.exports = PoseFallenService;
