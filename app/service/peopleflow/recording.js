'use strict';

const Service = require('egg').Service;

class PeopleflowRecordingService extends Service {
  // TODO: Handle logic of recording
  async recording(raw) {
  }

  // TODO: Handle real logic
  async monitoring() {
    const data = {
      id: 1,
      time: '2021-01-27 15:17:35',
      location: '大门',
      in: 12,
      out: 14,
      total: 8,
      x: [ 12, 15, 49, 12, 23, 49, 60, 90 ],
      y: [ 12, 15, 49, 12, 23, 49, 60, 90 ],
    };
    return data;
  }
}

module.exports = PeopleflowRecordingService;
