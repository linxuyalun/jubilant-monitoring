'use strict';

const Controller = require('egg').Controller;

class PoseProwlerController extends Controller {
  async statistics() {
    const { ctx } = this;
    const data = await ctx.service.pose.prowler.statistics();
    ctx.body = {
      error: 0,
      data,
    };
  }

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
      const num = Number(interval);
      if (isNaN(num) || num <= 0) {
        throw new Error('设置徘徊最小时间失败，传入参数 interval 不合法。');
      }

      await ctx.service.pose.prowler.setMinTime(Math.ceil(num));
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

module.exports = PoseProwlerController;
