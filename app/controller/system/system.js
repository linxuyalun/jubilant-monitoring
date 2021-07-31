
'use strict';
const Controller = require('egg').Controller;


class SystemController extends Controller {
  async getMode() {
    const mode = await this.service.system.system.getMode();
    this.ctx.body = {
      error: 0,
      data: {
        mode,
      },
    };
  }

  async setMode() {
    const { mode } = this.ctx.request.body;
    try {
      this.ctx.validate({
        mode: [ 0, 1, 2 ],
      });
      await this.service.system.system.setMode(mode);
      this.ctx.body = {
        error: 0,
      };
    } catch (e) {
      this.ctx.body = {
        error: 1,
        message: e.errors,
      };
    }
  }

  async getHistory() {
    const data = await this.service.system.system.getHistory();
    this.ctx.body = {
      error: 0,
      data,
    };
  }
}

module.exports = SystemController;
