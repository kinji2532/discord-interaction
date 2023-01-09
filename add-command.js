const cmdManager = require('./api/utils');

require('dotenv').config();

// cmdManager.get().then(console.log);

cmdManager.command().then(data => {
  cmdManager.set(Object.values(data).map(d=>d[0])).then(console.log);
});