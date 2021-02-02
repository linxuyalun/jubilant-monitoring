'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class PoseChannelsController extends Controller {
  async getChannels() {
    const { ctx } = this;
    const data = await ctx.service.pose.channels.getChannels();
    ctx.body = {
      error: 0,
      data,
    };
  }

  async setChannels() {
    const { ctx } = this;
    const arr = ctx.request.body;
    const { channelList } = JSON.parse(fs.readFileSync('./config/monitoring.settings.json', 'utf-8'));
    try {
      arr.forEach(item => {
        ctx.validate({
          id: channelList,
          // type = 1，姿态（fallen; type = 2，徘徊（prowler）;type = 3，两者皆有
          type: [ 1, 2, 3 ],
          location: { type: 'string' },
          url: { type: 'string' },
        }, item);
      });
      await ctx.service.pose.channels.setChannels(arr);
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

module.exports = PoseChannelsController;
