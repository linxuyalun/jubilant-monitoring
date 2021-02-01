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
      ctx.validate({
        interval: { type: 'int' },
      });

      await ctx.service.pose.prowler.setMinTime(interval);
      ctx.body = {
        error: 0,
        interval,
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
