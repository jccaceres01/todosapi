/**
 * Logs errors handler
 */
const fs = require('fs');
const path = require('path');

const logFile = fs.createWriteStream(
  path.join(__dirname, '../storage/server.log'), { flags: 'a' }
);

const log = (info) => {
  if (info instanceof String) {
    logFile.write(`[${new Date()}]: `);
    logFile.write(info);
  } else {
    logFile.write(`[${new Date()}]: `);
    logFile.write(JSON.stringify(info, null, 2));
  }
};

module.exports = {
  log
};
