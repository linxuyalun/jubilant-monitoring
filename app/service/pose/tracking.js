'use strict';

const Service = require('egg').Service;
class PoseTrackingService extends Service {
  async recording(raw) {
    const poseChannelsRaw = await this.app.redis.get('poseChannels');
    const poseChannels = JSON.parse(poseChannelsRaw);
    if (!poseChannels) {
      return;
    }
    const channelInfo = poseChannels.filter(item => item.id === Number(raw.cameraId));
    const originImage = await this.app.redis.get(raw.cameraId + raw.timestamp);
    const data = {
      time: this.ctx.helper.getTimeNow(),
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
    await this.ctx.model.Tracking.create(data);
  }

  async statistics() {
    const raw = await this.app.redis.get('poseChannels');
    let poseChannels = JSON.parse(raw);
    if (!poseChannels) {
      poseChannels = [];
    }
    let sum = 0;
    const statistics = [];
    for (let i = 0; i < poseChannels.length; i++) {
      const quantity = await this.ctx.model.Tracking.count({ channelId: poseChannels[i].id });
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
    // 将传入的参数转为日期格式，起始日期为入参日期的0点，截止日期为入参日期的24点
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    endDate.setDate(endDate.getDate() + 1);
    const timeSearch = { time: { $gte: startDate, $lt: endDate } };

    // channelId 为 0 表示所有
    const search = channelId === 0 ? timeSearch : { channelId, ...timeSearch };

    const total = await this.ctx.model.Tracking.find(search).count();
    const data = await this.ctx.model.Tracking.find(search)
      .sort({ _id: -1 })
      .skip(pageSize * pageIndex)
      .limit(pageSize);

    const arr = data.map(item => {
      const { time, channelId, peopleId, location, images, bbox } = item;
      const formatTime = this.ctx.helper.getFriendlyTime(time);
      return { time: formatTime, channelId, peopleId, location, images, bbox };
    });
    return {
      total,
      size: pageSize,
      data: arr,
    };
  }
}

module.exports = PoseTrackingService;
