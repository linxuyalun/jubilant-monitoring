'use strict';

const Controller = require('egg').Controller;

class PeopleflowStatusController extends Controller {
  async getStatus() {
    const { ctx } = this;
    const isRunning = await ctx.service.peopleflow.status.getStatus();
    ctx.body = {
      error: 0,
      data: {
        isRunning,
      },
    };
  }

  async setChannels() {
    const { ctx } = this;
    try {
      ctx.validate({
        isRunning: { type: 'bool' },
      });
      await ctx.service.peopleflow.status.setStatus(ctx.request.body.isRunning);
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

module.exports = PeopleflowStatusController;
