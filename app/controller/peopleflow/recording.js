'use strict';

const Controller = require('egg').Controller;

class PeopleflowRecordingController extends Controller {
  // TODO: Not done yet
  async recording() {
    const { ctx } = this;
    const raw = ctx.request.body;
    // await ctx.service.propleflow.recording.recording(raw);
    console.log(raw)
    ctx.body = {
      error: 0,
    };
  }

  // TODO: Not done yet.
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
