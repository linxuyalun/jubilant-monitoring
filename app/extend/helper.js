'use strict';

module.exports = {
  // getTimeNow returns the current time, e.g. '2021-02-08T21:49:33.813Z'
  getTimeNow() {
    const now = new Date();
    // The machine has 8 hours lag
    now.setHours(now.getHours() + 8);
    return now;
  },
  // getFriendlyTime returns a humen-readable formatted string
  // (2021-02-08T21:49:33.813Z) --> '2021-02-08 21:49:33'
  getFriendlyTime(date) {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  },
};
