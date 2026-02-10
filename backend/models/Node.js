const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  text: { type: String, default: 'New Node' },
  position: { x: Number, y: Number },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null },
  path: { type: String, index: true }, // Format: ",rootId,parentId,"
  isDeleted: { type: Boolean, default: false },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Node', NodeSchema);