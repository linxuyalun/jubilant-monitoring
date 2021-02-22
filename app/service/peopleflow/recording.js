'use strict';

const Service = require('egg').Service;

class PeopleflowRecordingService extends Service {
  async recording(raw) {
    /**
     * eventType int 功能ID; mode int 发送模式：0-单相机数据，1-通道整合数据;
     * vendor int 厂商ID; cameraId int 相机ID; regionId	int	监控区域ID; time	int	时间戳;
     * peopleIN	int	1s内进入人数; peopleOUT	int	1s内出去人数; peopleNUM	int	监控范围内实时人数;
     * peopleX array<float>	人位置世界坐标X数组; peopleY array<float> 人位置世界坐标Y数组.
     */
    const { cameraId, time, peopleIN, peopleOUT, peopleNUM, peopleX, peopleY } = raw;
    const peopleflowChannelRaw = await this.app.redis.get('peopleflowChannel');
    const peopleflowChannel = JSON.parse(peopleflowChannelRaw);
    if (!peopleflowChannel || JSON.stringify(peopleflowChannel) === '{}') {
      return;
    }
    const data = {
      time: this.ctx.helper.getTimeNow(),
      timestamp: time,
      channelId: Number(cameraId),
      location: peopleflowChannel.location,
      in: peopleIN,
      out: peopleOUT,
      total: peopleNUM,
      x: peopleX,
      y: peopleY,
    };
    await this.ctx.model.Peopleflow.create(data);
    console.log('SUCCESS')
  }

  async monitoring() {
    const data = await this.ctx.model.Peopleflow.findOne().sort({ _id: -1 });
    return {
      id: data.channelId,
      time: data.time,
      location: data.location,
      in: data.in,
      out: data.out,
      total: data.total,
      x: data.x,
      y: data.y,
    };
  }
}

module.exports = PeopleflowRecordingService;
