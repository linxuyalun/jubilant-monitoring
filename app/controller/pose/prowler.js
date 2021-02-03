'use strict';

const Controller = require('egg').Controller;

class PoseProwlerController extends Controller {
  async getMinTime() {
    const { ctx } = this;
    const data = await ctx.service.pose.prowler.getMinTime();
    ctx.body = {
      error: 0,
      data,
    };
  }

  async setMinTime() {
    const { ctx } = this;
    const { interval } = ctx.request.body;
    try {
      ctx.validate({
        interval: { type: 'int', min: 1 },
      });

      await ctx.service.pose.prowler.setMinTime(interval);
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

  async recording() {
    const { ctx } = this;
    console.log(ctx.request.body);
    // // FIXME: Mock data here
    // // 8 hours lag
    // const now = new Date();
    // now.setHours(now.getHours() + 8);
    // const data = {
    //   time: now,
    //   channelId: 1,
    //   peopleId: 12,
    //   location: 'gate',
    //   images: {
    //     person: 'person',
    //     scene: 'scene',
    //   },
    //   bbox: {
    //     x: 0,
    //     y: 0,
    //     width: 100,
    //     height: 100,
    //   },
    // };
    // await ctx.service.pose.prowler.recording(data);
    ctx.body = {
      error: 0,
    };
  }

  async statistics() {
    const { ctx } = this;
    const data = await ctx.service.pose.prowler.statistics();
    ctx.body = {
      error: 0,
      data,
    };
  }

  async message() {
    const { ctx } = this;
    const { pageIndex = '0', pageSize = '10', channelId = '0', startTime, endTime } = ctx.query;
    try {
      ctx.validate({
        pageIndex: { convertType: 'int', type: 'int', min: 0, required: false },
        pageSize: { convertType: 'int', type: 'int', min: 3, required: false },
        channelId: { convertType: 'int', type: 'int', min: 0, required: false },
        startTime: { type: 'date' },
        endTime: { type: 'date' },
      }, ctx.query);
      const data = await ctx.service.pose.prowler.message(
        Number(pageIndex), Number(pageSize), Number(channelId), startTime, endTime);
      ctx.body = {
        error: 0,
        data,
      };
    } catch (e) {
      ctx.body = {
        error: 1,
        message: e.errors,
      };
    }
  }
}

module.exports = PoseProwlerController;
