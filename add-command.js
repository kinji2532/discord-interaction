const cmdManager = require('./api/utils');

require('dotenv').config();

//cmdManager.set(Object.values(require('./api/commands')).map(d=>d[0])).then(console.log);

cmdManager.get().then(console.log);

//const id = '1046083034023202917';

//cmdManager.delete(id).then(console.log);

