const fetch = require("node-fetch");

fetch(`https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`,
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