// services/historyService.js
const ChangeLog = require('../models/ChangeLog');
const Node = require('../models/node');

exports.reconstructStateAt = async (timestamp) => {
  const logs = await ChangeLog.find({ timestamp: { $lte: timestamp } }).sort({ timestamp: 1 });
  let state = {};

  logs.forEach(log => {
    if (log.operation === 'CREATE') state[log.nodeId] = log.payload;
    if (log.operation === 'MOVE') state[log.nodeId].position = log.payload.position;
    if (log.operation === 'DELETE') delete state[log.nodeId];
  });

  return Object.values(state);
};