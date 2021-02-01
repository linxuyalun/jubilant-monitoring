'use strict';

const Controller = require('egg').Controller;

class PoseFallenController extends Controller {
  async statistics() {
    const { ctx } = this;
    const data = await ctx.service.pose.fallen.statistics();
    ctx.body = {
      error: 0,
      data,
    };
  }
}

module.exports = PoseFallenController;
