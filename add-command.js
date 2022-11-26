const fetch = require("node-fetch");

const guildId = "506072711815233536";

fetch(`https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bot ${process.env.TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(Object.values(require('./api/commands')).map(d=>d[0])),
  }
).then(async response => {
  if (response.ok) {
    console.log("Registered all commands");
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
  }
});