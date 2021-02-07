'use strict';

const Controller = require('egg').Controller;

class PoseTrackingController extends Controller {
  async recording() {
    const { ctx } = this;
    const raw = ctx.request.body;
    await ctx.service.pose.tracking.recording(raw);
    ctx.body = {
      error: 0,
    };
  }

  async statistics() {
    const { ctx } = this;
    const data = await ctx.service.pose.tracking.statistics();
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
      const data = await ctx.service.pose.tracking.message(
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

module.exports = PoseTrackingController;
