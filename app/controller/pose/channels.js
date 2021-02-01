'use strict';

const Controller = require('egg').Controller;

class PoseChannelsController extends Controller {
  async getChannels() {
    const { ctx } = this;
    const data = await ctx.service.pose.channels.getChannels();
    ctx.body = {
      error: 0,
      data,
    };
  }


  async setChannels() {
    const { ctx } = this;
    // const arr = ctx.request.body;
    // FIXME: Mock data here
    const arr = [
      {
        id: 1,
        location: 'gate',
        type: 1,
        url: 'rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream',
      },
      {
        id: 2,
        location: 'gate',
        type: 3,
        url: 'rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream',
      },
    ];
    try {
      arr.forEach(item => {
        ctx.validate({
          id: { type: 'int', min: 0 },
          /**
           * type = 1，姿态（fallen）
           * type = 2，徘徊（prowler）
           * type = 3，两者皆有
           */
          type: [ 1, 2, 3 ],
        }, item);
      });
      // FIXME: should be ctx.request.body
      await ctx.service.pose.channels.setChannels(arr);
      ctx.body = {
        error: 0,
      };
    } catch (e) {
      ctx.body = {
        error: 1,
        message: e.errors,
      };
    }
  }
}

module.exports = PoseChannelsController;
