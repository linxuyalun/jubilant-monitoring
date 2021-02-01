'use strict';

const Controller = require('egg').Controller;

class PeopleflowChannelsController extends Controller {
  async getChannels() {
    const { ctx } = this;
    const data = await ctx.service.peopleflow.channels.getChannels();
    ctx.body = {
      error: 0,
      data,
    };
  }

  async setChannels() {
    const { ctx } = this;
    // const arr = ctx.request.body;
    // FIXME: Mock data here
    try {
      ctx.validate({
        id: { type: 'int', min: 0 },
        location: { type: 'string' },
        url: { type: 'string' },
      });
      await ctx.service.peopleflow.channels.setChannels(ctx.request.body);
      ctx.body = {
        error: 0,
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        error: 1,
        message: e.errors,
      };
    }
  }

  async monitoring() {
    const { ctx } = this;
    const data = await ctx.service.peopleflow.channels.monitoring();
    ctx.body = {
      error: 0,
      data,
    };
  }
}

module.exports = PeopleflowChannelsController;
