const fetch = require("node-fetch");

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
    const subCommand = message.data.options[0];

    switch(subCommand.name) {
      case 'add':
        break;
      case 'delete':
        break;
      case 'list':
        fetch(`https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bot ${process.env.TOKEN}`,
            },
            method: "GET"
          }
        ).then(async res => {
          const result = JSON.parse(await res.text());
          return response.status(200).send({
          type: 4,
          data: { content: result.map(d => `${d.name}: ${d.id}`).join('\n') }
        });
      });
    }
    console.log(JSON.stringify(message.data, null, 2));
  }
];