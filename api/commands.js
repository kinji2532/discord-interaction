
exports.commands = [
  {
    name: 'commands',
    description: 'slash command manager',
    options: [
      {
        name: 'add',
        description: 'add command',
        type: 1,
        options: [ { name: 'data', description: 'add data', type: 3, required: true } ]
      },
      {
        name: 'delete',
        description: 'delete command',
        type: 1,
        options: [ { name: 'id', description: 'remove id', type: 3, required: true } ]
      },
      {
        name: 'list',
        description: 'list command',
        type: 1
      }
    ]
  }, (message, response) => {
    response.status(200).send({
      type: 4,
      data: { content: Object.keys(exports).join('\n') }
    });
    console.log(message.data);
  }
];