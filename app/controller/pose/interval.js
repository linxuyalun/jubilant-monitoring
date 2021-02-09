'use strict';

const Controller = require('egg').Controller;

/**
 * getInterval 和 setInterval 目前没有任何用处，只是单纯对值进行了保存
 */
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
      ctx.validate({
        interval: { type: 'int', min: 1 },
      });
      await ctx.service.pose.interval.setInterval(interval);
      ctx.body = {
        error: 0,
      };
    } catch (e) {
      console.error(e);
      ctx.body = {
        error: 1,
        message: e.errors,
      };
    }
  }
}

module.exports = PoseIntervalController;
