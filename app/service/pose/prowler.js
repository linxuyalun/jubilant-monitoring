'use strict';

const Service = require('egg').Service;
const fs = require('fs');
class PoseProwlerService extends Service {
  async getMinTime() {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    return {
      interval: settings.poseProwlerMinTime,
    };
  }

  async setMinTime(interval) {
    const data = fs.readFileSync('./config/monitoring.settings.json', 'utf-8');
    const settings = JSON.parse(data);
    settings.poseProwlerMinTime = interval;
    const str = JSON.stringify(settings);
    fs.writeFileSync('./config/monitoring.settings.json', str);
    // Send prowler interval to redis to inform the AI module handle the interval
    await this.app.redis.publish('interval', interval);
  }

  async recording(raw) {
    const { poseChannels } = JSON.parse(fs.readFileSync('./config/monitoring.settings.json', 'utf-8'));
    const channelInfo = poseChannels.filter(item => item.id === Number(raw.cameraId));
    const originImage = await this.app.redis.get(raw.cameraId + raw.timestamp);
    // 8 hours lag
    const now = new Date();
    now.setHours(now.getHours() + 8);
    const data = {
      time: now,
      timestamp: raw.timestamp,
      channelId: Number(raw.cameraId),
      location: channelInfo[0].location,
      images: {
        person: raw.bbox.image,
        scene: originImage,
      },
      peopleId: raw.bbox.peopleId,
      bbox: {
        x0: raw.bbox.x0,
        y0: raw.bbox.y0,
        x1: raw.bbox.x1,
        y1: raw.bbox.y1,
      },
    };
    await this.ctx.model.Prowler.create(data);
  }

  async statistics() {
    const { poseChannels } = JSON.parse(fs.readFileSync('./config/monitoring.settings.json', 'utf-8'));
    let sum = 0;
    const statistics = [];
    for (let i = 0; i < poseChannels.length; i++) {
      const quantity = await this.ctx.model.Prowler.count({ channelId: poseChannels[i].id });
      sum += quantity;
      statistics.push({
        id: poseChannels[i].id,
        location: poseChannels[i].location,
        quantity,
      });
    }
    statistics.push({
      id: 0,
      location: '全部',
      quantity: sum,
    });
    return statistics;
  }

  async message(pageIndex, pageSize, channelId, startTime, endTime) {
    const total = await this.ctx.model.Prowler.count();

    // 将传入的参数转为日期格式，起始日期为入参日期的0点，截止日期为入参日期的24点
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    endDate.setDate(endDate.getDate() + 1);
    const timeSearch = { time: { $gte: startDate, $lt: endDate } };

    // channelId 为 0 表示所有
    const search = channelId === 0 ? timeSearch : { channelId, ...timeSearch };

    const data = await this.ctx.model.Prowler.find(search)
      .sort({ _id: -1 })
      .skip(pageSize * pageIndex)
      .limit(pageSize);

    const arr = data.map(item => {
      const { time, channelId, peopleId, location, images, bbox } = item;
      const formatTime = time.toISOString().replace('T', ' ').slice(0, 19);
      return { time: formatTime, channelId, peopleId, location, images, bbox };
    });
    return {
      total,
      size: pageSize,
      data: arr,
    };
  }
}

module.exports = PoseProwlerService;
