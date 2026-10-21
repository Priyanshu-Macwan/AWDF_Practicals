const { EventEmitter } = require("node:events");

class TaskEventEmitter extends EventEmitter {}

module.exports = new TaskEventEmitter();
