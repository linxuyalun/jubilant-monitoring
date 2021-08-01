'use strict';

const Service = require('egg').Service;
const { REDIS_STATUS } = require('../../constant.js');

const { execFile } = require('child_process');
class SystemService extends Service {
  async getMode() {
    let mode = await this.app.redis.get(REDIS_STATUS.MODE);
    if (!mode) {
      await this.app.redis.set(REDIS_STATUS.MODE, '0');
      mode = '0';
    }
    return Number(mode);
  }

  async setMode(mode) {
    const oldMode = await this.app.redis.get(REDIS_STATUS.MODE);
    if (mode === Number(oldMode)) {
      return;
    }
    await this.app.redis.set(REDIS_STATUS.MODE, mode);
    if (mode === 1) {
      // start pose service
      execFile('scripts/start_pose_process.sh', [], (err, stdout) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
      });
      // kill peopleflow service
      this.app.redis.set(REDIS_STATUS.PEOPLEFLOW_STATUS, 'false');
      execFile('scripts/kill_peopleflow_process.sh', [], (err, stdout) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
      });
    } else if (mode === 2) {
      // 启动 peopleflow 服务
      execFile('scripts/start_peopleflow_process.sh', [], (err, stdout) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
      });
      // kill pose 服务
      this.app.redis.set(REDIS_STATUS.POSE_STATUS, 'false');
      execFile('scripts/kill_pose_process.sh', [], (err, stdout) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
      });
    }
  }

  async getHistory() {
    const data = await this.ctx.model.History.find()
      .sort({ _id: -1 })
      .limit(10);
    return data;
  }

}

module.exports = SystemService;
