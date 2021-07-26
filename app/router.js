'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // FIXME: For test
  router.get('/', controller.home.index);

  // 系统模式设置
  router.get('/api/system/mode', controller.system.system.getMode);
  router.put('/api/system/mode', controller.system.system.setMode);

  // 行为识别算法模块
  // 配置相关
  router.get('/api/pose/interval', controller.pose.interval.getInterval);
  router.put('/api/pose/interval', controller.pose.interval.setInterval);
  router.get('/api/pose/channels', controller.pose.channels.getChannels);
  router.put('/api/pose/channels', controller.pose.channels.setChannels);
  router.get('/api/pose/status', controller.pose.status.getStatus);
  router.put('/api/pose/status', controller.pose.status.setStatus);
  router.get('/api/pose/prowler/minTime', controller.pose.prowler.getMinTime);
  router.put('/api/pose/prowler/minTime', controller.pose.prowler.setMinTime);
  // 报警数据
  router.get('/api/pose/prowler/statistics', controller.pose.prowler.statistics);
  router.get('/api/pose/prowler/messages', controller.pose.prowler.message);
  router.put('/api/pose/prowler/recording', controller.pose.prowler.recording);
  router.get('/api/pose/fallen/statistics', controller.pose.fallen.statistics);
  router.get('/api/pose/fallen/messages', controller.pose.fallen.message);
  router.put('/api/pose/fallen/recording', controller.pose.fallen.recording);
  router.get('/api/pose/tracking/statistics', controller.pose.tracking.statistics);
  router.get('/api/pose/tracking/messages', controller.pose.tracking.message);
  router.put('/api/pose/tracking/recording', controller.pose.tracking.recording);

  // 人流算法模块
  // 配置相关
  router.get('/api/peopleflow/channels', controller.peopleflow.channels.getChannels);
  router.put('/api/peopleflow/channels', controller.peopleflow.channels.setChannels);
  router.get('/api/peopleflow/status', controller.peopleflow.status.getStatus);
  router.put('/api/peopleflow/status', controller.peopleflow.status.setStatus);
  // 报警数据
  router.post('/api/peopleflow/recording', controller.peopleflow.recording.recording);
  // 数据相关
  router.get('/api/peopleflow/monitoring/:channelId', controller.peopleflow.recording.monitoring);

};
