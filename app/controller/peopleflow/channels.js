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
    const arr = ctx.request.body;
    try {
      arr.forEach(item => {
        ctx.validate({
          // TODO: Check the id existence.
          id: { type: 'int' },
          location: { type: 'string' },
          url: { type: 'string' },
          enable: { type: 'bool' },
        }, item);
      });
      await ctx.service.peopleflow.channels.setChannels(arr);
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

module.exports = PeopleflowChannelsController;
