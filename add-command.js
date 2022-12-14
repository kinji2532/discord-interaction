const Interaction = require('./api/utils');

require('dotenv').config();

//Interaction.set(Object.values(require('./api/commands')).map(d=>d[0])).then(console.log);

Interaction.get().then(console.log);

const id = '1046083034023202917';

//Interaction.delete(id).then(console.log);

