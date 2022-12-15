const { InteractionResponseType, InteractionType, verifyKey } = require("discord-interactions");
const getRawBody = require("raw-body");
const cmdManager = require('./utils');

require('dotenv').config();

cmdManager.load();

module.exports = async (request, response) => {
  if (request.method === "POST") {
    const signature = request.headers["x-signature-ed25519"];
    const timestamp = request.headers["x-signature-timestamp"];
    const rawBody = await getRawBody(request);

    const isValidRequest = verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY);

    if (!isValidRequest) return response.status(401).send({ error: "Bad request signature " });

    const message = request.body;

    if (message.type === InteractionType.PING) {
      response.send({ type: InteractionResponseType.PONG });
    }
    else if (message.type === InteractionType.APPLICATION_COMMAND) {
      console.log(message);

      const commandFunc = cmdManager.list[message.data.name]?.[1];

      if(!commandFunc) return response.status(200).send({ content: "Unknown Command" });

      try {
        return commandFunc(message, response);
      } catch(e) {
        return response.status(200).send({ content: e.message });
      }
    } else {
      response.status(400).send({ error: "Unknown Type" });
    }
  }
};