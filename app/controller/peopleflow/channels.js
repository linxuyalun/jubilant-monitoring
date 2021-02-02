'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

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
    const { channelList } = JSON.parse(fs.readFileSync('./config/monitoring.settings.json', 'utf-8'));
    try {
      ctx.validate({
        id: channelList,
        location: { type: 'string' },
        url: { type: 'string' },
      });
      await ctx.service.peopleflow.channels.setChannels(ctx.request.body);
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

  // TODO: Not done yet.
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
