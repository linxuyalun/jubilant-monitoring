'use strict';

const Subscription = require('egg').Subscription;

const cleanHour = 1;
const cronPolicy = `0 0 ${cleanHour} * * *`;
const retainDays = 7;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      cron: cronPolicy,
      type: 'all',
    };
  }

  async subscribe() {
    const now = this.ctx.helper.getTimeNow();
    const beforeDate = this.ctx.helper.getTimeNow();
    beforeDate.setDate(now.getDate() - retainDays);
    const timeSearch = { time: { $lt: beforeDate } };
    const cleanResult = {
      date: now,
      policy: cronPolicy,
      sucess: false,
      message: '',
      deletedCount: {
        fallen: 0,
        prowler: 0,
        tracking: 0,
        peopleflow: 0,
      },
    };
    try {
      // delete fallen old documents
      const fallenCount = await this.ctx.model.Fallen.count(timeSearch);
      await this.ctx.model.Fallen.deleteMany(timeSearch);
      cleanResult.deletedCount.fallen = Number(fallenCount);
      // delete prowler old documents
      const prowlerCount = await this.ctx.model.Prowler.count(timeSearch);
      await this.ctx.model.Prowler.deleteMany(timeSearch);
      cleanResult.deletedCount.prowler = Number(prowlerCount);
      // delete tracking old documents
      const trackedCount = await this.ctx.model.Tracking.count(timeSearch);
      await this.ctx.model.Tracking.deleteMany(timeSearch);
      cleanResult.deletedCount.tracking = Number(trackedCount);
      // delete old peopleflow documents
      const peopleflowCount = await this.ctx.model.Peopleflow.count(timeSearch);
      await this.ctx.model.Peopleflow.deleteMany(timeSearch);
      cleanResult.deletedCount.peopleflow = Number(peopleflowCount);

      cleanResult.sucess = true;
      cleanResult.message = 'clean old documents successfully';
    } catch (err) {
      cleanResult.message = String(err);
    }

    await this.ctx.model.History.create(cleanResult);
  }
}

module.exports = UpdateCache;
