'use strict';

const Controller = require('egg').Controller;

class PeopleflowRecordingController extends Controller {
  async recording() {
    const { ctx } = this;
    const raw = ctx.request.body;
    await ctx.service.peopleflow.recording.recording(raw);
    ctx.body = {
      error: 0,
    };
  }

  async monitoring() {
    const { ctx } = this;
    const data = await ctx.service.peopleflow.recording.monitoring();
    ctx.body = {
      error: 0,
      data,
    };
  }
}

module.exports = PeopleflowRecordingController;
