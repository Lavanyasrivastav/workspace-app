const Node = require('../models/node');

const handleSocketConfig = (wss) => {
  wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
      const message = JSON.parse(data);
      const { type, payload } = message;

      if (type === 'CREATE_NODE') {
        let parentExists = true;
        if (payload.parentId) {
          const parent = await Node.findOne({ _id: payload.parentId, isDeleted: false });
          if (!parent) parentExists = false;
        }

        if (!parentExists) {
          // CONFLICT RESOLUTION: Move to Lost & Found
          payload.parentId = "LOST_AND_FOUND_ID"; 
          payload.path = ",LOST_AND_FOUND_ID,";
        }

        const newNode = await Node.create(payload);
        broadcast(wss, { type: 'NODE_CREATED', payload: newNode });
      }
      
      if (type === 'MOVE_NODE') {
        await Node.findByIdAndUpdate(payload.id, { position: payload.position });
        broadcast(wss, { type: 'NODE_MOVED', payload });
      }
    });
  });
};

function broadcast(wss, data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(JSON.stringify(data));
  });
}

module.exports = handleSocketConfig;