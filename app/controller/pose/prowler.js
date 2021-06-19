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
    const raw = ctx.request.body;
    await ctx.service.pose.prowler.recording(raw);
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
        startTime: { type: 'dateTime' },
        endTime: { type: 'dateTime' },
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
