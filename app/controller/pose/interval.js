'use strict';

const Controller = require('egg').Controller;

class PoseIntervalController extends Controller {
  async getInterval() {
    const { ctx } = this;
    const data = await ctx.service.pose.interval.getInterval();
    ctx.body = {
      error: 0,
      data,
    };
  }

  async setInterval() {
    const { ctx } = this;
    const { interval } = ctx.request.body;
    try {
      const num = Number(interval);
      if (isNaN(num) || num <= 0) {
        throw new Error('设置报警间隔时间失败，传入参数 interval 不合法。');
      }

      await ctx.service.pose.interval.setInterval(Math.ceil(num));
      ctx.body = {
        error: 0,
        interval,
      };
    } catch (e) {
      console.error(e);
      ctx.body = {
        error: 1,
        message: e.message,
      };
    }
  }
}

module.exports = PoseIntervalController;
