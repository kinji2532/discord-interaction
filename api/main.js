const { InteractionResponseType, InteractionType, verifyKey } = require("discord-interactions");
const getRawBody = require("raw-body");

require('dotenv').config();

const cmdList = require('./commands');

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
      console.log('APPLICATION_COMMAND', message);

      const commandFunc = cmdList[message.data.name]?.[1];

      if(!commandFunc) return response.status(200).send({ content: "Unknown Command" });

      try {
        return commandFunc(message, response);
      } catch(e) {
        return response.status(200).send({ content: e.message });
      }
    } 
    else if(message.type === InteractionType.APPLICATION_MODAL_SUBMIT) {
      console.log('APPLICATION_MODAL_SUBMIT', message);
      return response.status(200).send({
        type: 4,
        data: { content: 'OK' }
      });
    }
    else {
      console.log('?', message);
      response.status(200).send({ content: "Unknown Type" });
    }
  }
};