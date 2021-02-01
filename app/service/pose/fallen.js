'use strict';

const Service = require('egg').Service;

class PoseFallenService extends Service {
  async recording(data) {
    await this.ctx.model.Fallen.create(data);
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
        id: 2,
        location: 'wow',
        quantity: 2,
      },
    ];
    return arr;
  }

  async message(pageIndex, pageSize, channelId, startTime, endTime) {
    const total = await this.ctx.model.Fallen.count();

    // 将传入的参数转为日期格式，起始日期为入参日期的0点，截止日期为入参日期的24点
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    endDate.setDate(endDate.getDate() + 1);
    const timeSearch = { time: { $gte: startDate, $lt: endDate } };

    // channelId 为 0 表示所有
    const search = channelId === 0 ? timeSearch : { channelId, ...timeSearch };

    const data = await this.ctx.model.Fallen.find(search)
      .sort({ _id: -1 })
      .skip(pageSize * pageIndex)
      .limit(pageSize);

    const arr = data.map(item => {
      const { time, channelId, location, images, bbox } = item;
      const formatTime = time.toISOString().replace('T', ' ').slice(0, 19);
      return { time: formatTime, channelId, location, images, bbox };
    });
    return {
      total,
      size: pageSize,
      data: arr,
    };
  }
}

module.exports = PoseFallenService;
