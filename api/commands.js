exports.INVITE_COMMAND = {
  name: "invite",
  description: "Get an invite link to add the bot to your server"
};

exports.SLAP_COMMAND = {
  name: "slap",
  description: "Sometimes you gotta slap a person with a large trout",
  options: [
    {
      name: "user",
      description: "The user to slap",
      type: 6,
      required: true
    }
  ]
};

exports.COMMANDS = {
  name: 'commands',
  description: 'slash command manager',
  options: [
    {
      name: 'add',
      description: 'add command',
      type: 1,
      options: [
        {
          name: 'data',
          description: 'add data',
          type: 3,
          required: true
        }
      ]
    },
    {
      name: 'delete',
      description: 'delete command',
      type: 1,
      options: [
        {
          name: 'id',
          description: 'remove id',
          type: 3,
          required: true
        }
      ]
    },
    {
      name: 'list',
      description: 'list command',
      type: 1
    }
  ]
};

exports.list = Object.values(exports);