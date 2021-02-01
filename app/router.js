'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // FIXME: For test
  router.get('/', controller.home.index);

  // 行为识别算法模块
  router.get('/api/pose/interval', controller.pose.interval.getInterval);
  router.put('/api/pose/interval', controller.pose.interval.setInterval);
  router.get('/api/pose/channels', controller.pose.channels.getChannels);
  router.put('/api/pose/channels', controller.pose.channels.setChannels);
  router.get('/api/pose/prowler/minTime', controller.pose.prowler.getMinTime);
  router.put('/api/pose/prowler/minTime', controller.pose.prowler.setMinTime);

  // 报警数据
  router.get('/api/pose/prowler/statistics', controller.pose.prowler.statistics);
  router.get('/api/pose/fallen/statistics', controller.pose.fallen.statistics);
};
